const Joi = require('joi');

module.exports = Joi.object({
  displayName: Joi.string().min(8).required(),
  password: Joi.string().min(6).required().options({
    language: {
      string: { min: 'length must be 6 characters long' },
    },
  }),
  email: Joi.string().email().required(),
  image: Joi.string(),
});