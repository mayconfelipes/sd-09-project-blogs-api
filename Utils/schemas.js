const Joi = require('@hapi/joi');

module.exports = {
  user: Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  login: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  category: Joi.object({
    name: Joi.string().required(),
  }),
};