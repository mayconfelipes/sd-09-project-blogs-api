const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()).required(),
});

const validateError = (status, message) => ({
  status,
  message,
});

module.exports = { schema, validateError };
