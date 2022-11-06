require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const handler = require('./apiHandler');
const { schema, validate } = require('./apiSchema');

const err = (msg) => ({ err: msg });
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

const apiVersion = '/apiV1';

[
  ['get', '/currentUser', handler.common.currentUser, null],
  ['post', '/signup/company', handler.common.signupCompany, null, schema.signupCompany],
  ['post', '/signup/employee', handler.common.signupEmployee, null, schema.signupEmployee],
  ['put', '/login/company', handler.common.loginCompany, null, schema.loginCompany],
  ['put', '/login/employee', handler.common.loginEmployee, null, schema.loginEmployee],
  ['put', '/company', handler.company.update, 'company', schema.updateCompany],
  ['get', '/companyQuotes', handler.company.getQuotes, 'company'],
  ['post', '/file', handler.common.uploadFile, null],
  ['post', '/uploadS3File', handler.common.uploadS3File, null],
  ['post', '/uploadColumnFile', handler.common.uploadColumnFile, null],
  ['get', '/file/:id', handler.common.getFile, null],
  ['put', '/employee', handler.employee.update, 'employee', schema.update],
  ['get', '/company/profile/:id', handler.employee.getCompany, 'any'],
  ['get', '/employee/profile/:id', handler.company.getEmployee, 'company'],
  ['post', '/companyPhoto/:id', handler.employee.addCompanyPhoto, 'employee'],
  ['get', '/companyPhoto/:id', handler.employee.getCompanyPhotos, 'any'],
].forEach((r) => {
  app[r[0]](
    apiVersion + r[1],
    (req, resp, next) => {
      console.log(req.url, r[2].name, req.body);
      const token = req.header('authorization');
      req.session = {};
      if (token) {
        try {
          jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
          resp
            .status(401)
            .json(err('You need to login, your session has expired'));
        }
        req.session = jwt.decode(token);
      }

      if (r[3] === 'company' || r[3] === 'employee' || r[3] === 'admin') {
        const { scope } = req.session;
        if (scope !== r[3]) {
          resp.status(401).json(err('You are not authorized for this action.'));
        }
      }
      if (r[3] === 'any') {
        const { scope } = req.session;
        if (!scope) {
          resp.status(401).json(err('You need to login.'));
        }
      }
      if (r[4]) {
        const { error } = validate(req.body, r[4]);
        if (error) {
          const messages = error.details.map((d) => d.message);
          resp.status(400).json(err(messages[0]));
        } else {
          next();
        }
      } else {
        next();
      }
    },
    async (req, res, next) => {
      try {
        await r[2](req, res, next);
      } catch (e) {
        next(e);
      }
    }
  );
});

// Handle errors
app.use((err, req, res, next) => {
  console.log(err);
  if (err) {
    const { message } = err;
    res.status(500).json({ err: 'Something went wrong!', message });
  }
  next();
});

app.listen(parseInt(process.env.PORT));
module.exports = app; // used by mocha tests
