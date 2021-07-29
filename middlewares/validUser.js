const Joi = require('joi');
const invalidData = require('../utils/invalidData');

const BAD_REQUEST = 400;
const NAME_MIN_LENGTH = 8;
const PASS_MIN_LENGTH = 6;

const validUser = (req, _res, next) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(NAME_MIN_LENGTH).not().empty()
    .required(),
    email: Joi.string().email().not().empty()
    .required(),
    password: Joi.string().min(PASS_MIN_LENGTH).not().empty()
    .required()
    .messages({
      'string.min': '"password" length must be 6 characters long',
    }),
    image: Joi.string(),
  }).validate(req.body);

  if (error) return next(invalidData(error.message, BAD_REQUEST));

  next();
};

module.exports = validUser;
