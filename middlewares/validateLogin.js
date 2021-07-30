const Joi = require('joi');

const validateLogin = (req, res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().length(6).required(),
  }).validate(req.body);

  if (error) next(error);

  next();
};

module.exports = validateLogin;
