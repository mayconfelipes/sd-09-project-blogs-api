const Joi = require('joi');
const { User } = require('../models');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  password: Joi.string().length(6).required(),
  email: Joi.string().email().required(),
  image: Joi.string().required(),
});

const validateUser = async (req, _res, next) => {
  const user = req.body;
  const { error } = userSchema.validate(user);
  if (error) {
    return next({
      statusCode: 400,
      message: error.message,
    });
  }
  return next();
};

const hasDuplicatedEmail = async (req, _res, next) => {
  const { email } = req.body;
  const findUserByEmail = await User.findOne({ where: { email } });
  if (findUserByEmail) {
    return next({
      statusCode: 409,
      message: 'User already registered',
    });
  }
  return next();
};

module.exports = { validateUser, hasDuplicatedEmail };