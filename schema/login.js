const joi = require('joi');

module.exports = joi.object({
  email: joi.string().min(1).required(),
  password: joi.string().min(1).required(),
});
