const Joi = require("joi");

const validate = (body, schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: false, // remove unknown props
  };
  return schema.validate(body, options);
};

const reqStr = (label) => Joi.string().required().label(label);
const reqNum = (label) => Joi.number().required().label(label);
const optNum = (label) => Joi.number().label(label);
const optStr = (label) => Joi.string().allow("").label(label);
const optFiles = () => Joi.array().items(Joi.string()).label("Files");

// Doc - https://joi.dev/api/?v=17.3.0
// TODO : complete verify schema for all create and update apis, allowUnknown should be set to false
const schema = {
  signupCompany: Joi.object({
    name: reqStr("Buyer name"),
    email: Joi.string().email().required().label("Buyer email"),
    password: reqStr("Password"),
  }),
  signupEmployee: Joi.object({
    name: reqStr("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(3).required(),
  }),
  updateCompany: Joi.object({
    website: Joi.string().domain().label("Website"),
    ruleFormula: Joi.string(),
    mlRuleEngine: Joi.boolean(),
    dataFile: Joi.string(),
    targetColumn: Joi.string(),
  }),
  loginEmployee: Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required(),
  }),
  loginCompany: Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required(),
  }),
  update: Joi.object({
    name: Joi.string().allow("").optional(),
    race: optStr("Race"),
    disability: optStr("Disability"),
    veteranStatus: optStr("Veteran status"),
    jobTitleLookingFor: optStr("Job title looking for"),
    typeOfIndustry: optStr("Type of industry"),
    targetSalary: optNum("Salary"),
  }),
};

module.exports = { schema, validate };
