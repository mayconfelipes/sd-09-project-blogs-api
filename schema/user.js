const joi = require('joi');

module.exports = joi.object({
  displayName: joi.string().min(8),
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(6)
    .message('{#label} length must be 6 characters long')
    .required(),
});
