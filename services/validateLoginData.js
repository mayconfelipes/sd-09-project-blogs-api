const Joi = require('joi');
const { User } = require('../models');

const validateLoginData = (loginData) =>
  Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).validate(loginData);

const userExixts = async (email, password) => {
  const exists = await User.findOne({ where: { email, password } });
  console.log(exists);
  return exists;
};

module.exports = async (loginData) => {
  const { error } = validateLoginData(loginData);
  const { email, password } = loginData;

  if (error) {
    throw Error(error.details[0].message);
  }

  if (!(await userExixts(email, password))) {
    throw Error('Invalid fields');
  }
};
