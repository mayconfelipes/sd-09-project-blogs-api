const Joi = require('joi');
const generateError = require('../auxiliarFunctions/generateError');

const validateUser = (req, _res, next) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).not().empty()
      .required(),
    email: Joi.string().email().not().empty()
      .required(),
    password: Joi.string().min(6).not().empty()
      .required()
      .messages({
        'string.min': '"password" length must be 6 characters long',
      }),
    image: Joi.string(),
  }).validate(req.body);

  if (error) return next(generateError('badRequest', error.message));

  next();
};

module.exports = validateUser;
