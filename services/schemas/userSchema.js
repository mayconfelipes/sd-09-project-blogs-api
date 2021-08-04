const Joi = require('joi');

const schema = Joi.object({
  displayName: Joi.string().min(8).messages({
    'string.base': '"displyName" should be a string',
    'string.min': '"displayName" length must be at least 8 characters long',
    'any.required': '"displayName" is a required field',
  }),
  email: Joi.string().email().required().messages({
    'string.base': '"email" should be a string',
    'string.email': '"email" must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
  }),
});

const validateError = (status, message) => ({
  status,
  message,
});

module.exports = { schema, validateError };
