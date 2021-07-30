const Joi = require('joi');

const UserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  password: Joi.string().min(6).required().options({
    language: {
      string: { min: 'length must be 6 characters long' },
    },
  }),
  email: Joi.string().email().required(),
  image: Joi.string(),
});

const LoginSchema = Joi.object({
  password: Joi.string().min(6).required().options({
    language: {
      string: { min: 'length must be 6 characters long' },
    },
  }),
  email: Joi.string().email().required(),
});

const CategorySchema = Joi.object({
  name: Joi.string().required(),
});

const joiError = (status, error) => ({
  isJoi: true,
  status,
  error,
});

const validateError = (statusCode, message) => ({
  statusCode,
  message,
});

module.exports = {
  UserSchema,
  LoginSchema,
  CategorySchema,
  joiError,
  validateError,
};
