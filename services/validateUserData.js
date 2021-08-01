const Joi = require('joi');
const { User } = require('../models');

const validateUser = (userData) =>
  Joi.object({
    displayName: Joi.string().min(8),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    image: Joi.any(),
  }).validate(userData);

const validateEmail = async (email) => {
  const patternEmail = /\S+@\S+\.\S+/;
  return patternEmail.test(email);
};

const emailExixts = async (email) => {
  const exists = User.findOne({ where: { email } });
  return exists;
};

module.exports = async (userData) => {
  const { error } = validateUser(userData);
  const { email } = userData;

  if (error) {
    throw Error(error.details[0].message);
  }

  if (!(await validateEmail(email))) {
    throw Error('"email" must be a valid email');
  }

  if (await emailExixts(email)) {
    throw Error('User already registered');
  }
};
