const Joi = require('joi');
const generateError = require('../auxiliarFunctions/generateError');

const validateLogin = (req, res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().not().empty()
      .required(),
    password: Joi.string().not().empty().required(),
  }).validate(req.body);

  if (error) return next(generateError('badRequest', error.message));

  next();
};

module.exports = validateLogin;
