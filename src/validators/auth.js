const Joi = require("joi");
const validatorHandler = require("../middlewares/validatorHandler");

const signup = (req, res, next) => {
  const schema = Joi.object().keys({
    first_name: Joi.string().trim().max(255).required().messages({
      "string.required": `"first_name" is required`,
    }),
    last_name: Joi.string().trim().max(255).required().messages({
      "string.required": `"last_name" is required`,
      "string.empty": `"last_name" is required`,
    }),
    gender: Joi.string().trim().max(50).required().messages({
      "string.required": `"gender" is required`,
      "string.empty": `"gender" is required`,
    }),
    dob: Joi.date().required().messages({
      "string.required": `"Date of birth" is required`,
      "string.empty": `"Date of birth" is required`,
    }),
    email: Joi.string().trim().email().required().messages({
      "string.required": `"email" is required`,
      "string.empty": `"email" is required`,
    }),
    password: Joi.string().trim().min(6).max(30).alphanum().required().messages({
      "string.min": `"password" should have a minimum length of {#limit}`,
      "string.max": `"password" should have a maximum length of {#limit}`,
      "string.required": `"password" is required`,
      "string.empty": `"password" is required`,
    }),
    retype_password: Joi.any().valid(Joi.ref("password")).required().messages({
      "string.only": `"retype_password" must match "password"`,
      "string.required": `"retype_password" is required`,
    }),
  });
  validatorHandler(req, res, next, schema);
};

const signin = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required().messages({
      "string.required": `"email" is required`,
      "string.empty": `"email" is required`,
    }),
    password: Joi.string().trim().min(6).max(30).alphanum().required().messages({
      "string.min": `"password" should have a minimum length of {#limit}`,
      "string.max": `"password" should have a maximum length of {#limit}`,
      "string.required": `"password" is required`,
      "string.empty": `"password" is required`,
    }),
  });
  validatorHandler(req, res, next, schema);
};

module.exports = {
  signup,
  signin,
};
