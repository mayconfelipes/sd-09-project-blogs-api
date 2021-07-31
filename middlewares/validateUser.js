const Joi = require('joi');

const NAME_MIN_LENGTH = 8;
const PASS_MIN_LENGTH = 6;

const { code: { BAD_REQUEST } } = require('../utils');

const schema = Joi.object({
  displayName: Joi.string().min(NAME_MIN_LENGTH).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(PASS_MIN_LENGTH).required(),
  image: Joi.string().required(),
});

const validateUser = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(BAD_REQUEST).json({ message: error.message });

  next();
};

module.exports = validateUser;
