const Joi = require('joi');

module.exports = Joi.object({
  email: Joi.string().email().required().empty(),
  password: Joi.string().length(6).required().empty(),
});
