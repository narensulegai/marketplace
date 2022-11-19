const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");
const { Company, Employee } = require("../../mongodb");
const { err } = require("../util");

const saltRounds = 10;
const expiresIn = 1008000;

const signPayload = (payload) => {
  const jwtSecret = process.env.JWT_SECRET;
  return jwt.sign(payload, jwtSecret, { expiresIn });
};

AWS.config.update({
  accessKeyId: `${process.env.S3_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.S3_SECRET_ACCESS_KEY}`,
});

const S3Bucket = new AWS.S3({
  params: { Bucket: `${process.env.S3_BUCKET}` },
  region: `${process.env.S3_REGION}`,
});

module.exports = {
  currentUser: async (req, resp) => {
    if (req.session && req.session.scope) {
      let user = {};
      if (req.session.scope === "company") {
        user = await Company.findById(req.session.user._id);
      }
      if (req.session.scope === "employee") {
        user = await Employee.findById(req.session.user._id);
      }
      resp.json({ user, scope: req.session.scope });
    } else {
      resp.json({ user: null, scope: null });
    }
  },
  uploadFile: async (req, res) => {
    const upload = multer({ dest: "uploads/" }).array("files", 5);
    upload(req, res, (e) => {
      if (e) {
        res.status(400).json(err("Error while uploading file"));
      } else {
        res.json({
          files: req.files.map((f) => f.filename),
          originalFiles: req.files.map((f) => f.originalname),
        });
      }
    });
  },
  uploadS3File: async (req, res) => {
    let user = {};
    if (req.session.scope === "company") {
      user = await Company.findById(req.session.user._id);
      const companyName = user.name.split(" ").join("");
      let fileOrginalName;
      const csvFileUpload = multer({
        storage: multerS3({
          s3: S3Bucket,
          acl: "public-read",
          bucket: `${process.env.S3_BUCKET}`,
          key: (req, file, cb) => {
            fileOrginalName = file.originalname;
            const fileName = companyName + fileOrginalName;
            cb(null, `${companyName}/${fileName}`);
          },
        }),
      }).single("files");

      csvFileUpload(req, res, (e) => {
        if (e) {
          res.status(400).json(err("Error while uploading file"));
        } else if (req.file === undefined) {
          res.status(400).json(err("Error No file selected"));
        } else {
          // const file = req.file.key;
          const fileLocation = req.file.location;
          res.json({
            fileOrginalName,
            fileLocation,
          });
        }
      });
    }
  },
  uploadColumnFile: async (req, res) => {
    let user = {};
    if (req.session.scope === "company") {
      user = await Company.findById(req.session.user._id);
      const companyName = user.name.split(" ").join("");
      const data = Buffer.from(JSON.stringify(req.body), "utf-8");
      const params = {
        ACL: "public-read",
        Body: data,
        Bucket: `${process.env.S3_BUCKET}`,
        Key: `${companyName}/${companyName}targetColumn.txt`,
      };

      S3Bucket.putObject(params, (e) => {
        if (e) {
          res
            .status(400)
            .json(err("Error while updating target column file on s3 bucket"));
        }
      });
    }
  },
  getColumns: async (req, res) => {
    let user = {};
    if (req.session.scope === "company") {
      user = await Company.findById(req.session.user._id);
      const companyName = user.name.split(" ").join("");
      const fileOrginalName = user.dataFile;
      const fileName = companyName + fileOrginalName;
      const getParams = {
        Bucket: `${process.env.S3_BUCKET}`,
        Key: `${companyName}/${fileName}`,
        ExpressionType: 'SQL',
        Expression: 'SELECT * FROM S3Object s limit 1',
        InputSerialization: {
          CSV: {
            FileHeaderInfo: 'None',
            RecordDelimiter: '\r',
			      FieldDelimiter: ',',
          },
        },
        OutputSerialization: {
          CSV: {},
        },
      };
      const columns = [];
      S3Bucket.selectObjectContent(getParams, (e, data) => {
        if (e) {
          res
            .status(400)
            .json(err("Error while  getting column names from data file"));
        }
        const events = data.Payload;
        events.on('data', (event) => {
          if (event.Records) {
            // event.Records.Payload is a buffer containing
            // a single record, partial records, or multiple records
            columns.push(event.Records.Payload.toString());
          } else if (event.Stats) {
            console.log(`Processed ${event.Stats.Details.BytesProcessed} bytes`);
          } else if (event.End) {
            console.log('SelectObjectContent completed');
          }
        });
        events.on('end', () => {
          // Finished receiving events from S3
          let columnNames = columns[0].replace(/[\r\n]/gm, '');
          columnNames = columnNames.split(",");
          res.json({ columnNames });
        });
      });
    }
  },
  getFile: async (req, res) => {
    const fileId = req.params.id;
    // TODO: file path injection
    res.sendFile(path.join(__dirname, "../../uploads", fileId));
  },
  signupCompany: async (req, resp) => {
    bcrypt.hash(req.body.password, saltRounds, async (e, password) => {
      const company = new Company({ ...req.body, password });
      try {
        const user = await company.save();
        const payload = { user, scope: "company" };
        const token = signPayload(payload);
        resp.json({ token, user });
      } catch (e) {
        if (e.code === 11000) {
          resp
            .status(400)
            .json(err("Company name and/or email is already taken"));
        } else {
          throw e;
        }
      }
    });
  },
  signupEmployee: async (req, resp) => {
    bcrypt.hash(req.body.password, saltRounds, async (e, password) => {
      const employee = new Employee({ ...req.body, password });
      try {
        const user = await employee.save();
        const payload = { user, scope: "employee" };
        const token = signPayload(payload);
        resp.json({ token, user });
      } catch (e) {
        if (e.code === 11000) {
          resp.status(400).json(err("Email id is already taken"));
        } else {
          throw e;
        }
      }
    });
  },
  loginCompany: async (req, res) => {
    const { email, password } = req.body;
    const user = await Company.findOne({ email });
    if (user === null) {
      res.status(401).json(err("Email id doesn't exist"));
    } else {
      bcrypt.compare(password, user.password, (e, doseMatch) => {
        if (doseMatch) {
          const payload = { user, scope: "company" };
          const token = signPayload(payload);
          res.json({ token, user });
        } else {
          res.status(401).json(err("Company name password doesn't match"));
        }
      });
    }
  },
  loginEmployee: async (req, res) => {
    const { email, password } = req.body;
    const user = await Employee.findOne({ email });
    if (user === null) {
      res.status(401).json(err("Email doesn't exist"));
    } else {
      bcrypt.compare(password, user.password, (e, doseMatch) => {
        if (doseMatch) {
          const payload = { user, scope: "employee" };
          const token = signPayload(payload);
          res.json({ token, user });
        } else {
          res.status(401).json(err("Email password doesn't match"));
        }
      });
    }
  },
};
