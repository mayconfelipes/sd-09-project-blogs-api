const Joi = require('joi');
const err = require('./errors');

const userSchema = (userData) => {
    const { error } = Joi.object({
      displayName: Joi.string().min(8),
      email: Joi.string().email().required(),
      password: Joi.string().required().length(6),
      image: Joi.string(),
    }).validate(userData);
    if (error) {
      const { details } = error;
      const { message } = details[0];
      throw err(message, 400);
    }
};

const loginSchema = (loginData) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().length(6),
  }).validate(loginData);
  if (error) {
    const { details } = error;
    const { message } = details[0];
    throw err(message, 400);
  }
};

const categorySchema = (categoryData) => {
  const { error } = Joi.object({
    name: Joi.string().required().not().empty(),
  }).validate(categoryData);
  if (error) {
    const { details } = error;
    const { message } = details[0];
    throw err(message, 400);
  }
};

module.exports = {
  userSchema,
  loginSchema,
  categorySchema,
};