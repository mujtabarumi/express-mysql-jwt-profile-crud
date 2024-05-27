const Joi = require("joi");
const validatorHandler = require("../middlewares/validatorHandler");

const update = (req, res, next) => {
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
  });
  validatorHandler(req, res, next, schema);
};

module.exports = {
  update,
};
