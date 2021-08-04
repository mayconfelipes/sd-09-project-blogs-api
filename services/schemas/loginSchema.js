const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().required().empty().messages({
    'any.required': '"email" is required',
    'string.empty': '"email" is not allowed to be empty',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': '"password" is required',
    'string.empty': '"password" is not allowed to be empty',
  }),
});

const validateError = (status, message) => ({
  status,
  message,
});

module.exports = { schema, validateError };
