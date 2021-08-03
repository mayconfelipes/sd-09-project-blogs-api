const jwt = require('jsonwebtoken');
const { User } = require('../models');
const CustomError = require('../utils/CustomError');

const getToken = ({ id, displayName, email }) => jwt
  .sign({ id, displayName, email }, process.env.JWT_SECRET, { algorithm: 'HS256' });

const create = async (data) => {
  const registeredUser = await User.findOne({ where: { email: data.email } });
  if (registeredUser) {
    throw new CustomError('invalidEmail', 'User already registered');
  }
  const newUser = await User.create(data);
  return getToken(newUser);
};

const login = async ({ email, password }) => {
  const registeredUser = await User.findOne({ where: { email, password } });
  if (!registeredUser) {
    throw new CustomError('invalidData', 'Invalid fields');
  }
  return getToken(registeredUser.dataValues);
};

module.exports = {
  create,
  login,
};
