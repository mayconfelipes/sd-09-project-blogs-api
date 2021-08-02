const jwt = require('jsonwebtoken');
const { User } = require('../models');
const CustomError = require('../utils/CustomError');

const getToken = ({ id, displayName, email }) => jwt
  .sign({ id, displayName, email }, process.env.JWT_SECRET, { algorithm: 'HS256' });

const create = async (userData) => {
  const registeredUser = await User.findOne({ where: { email: userData.email } });
  if (registeredUser) {
    throw new CustomError('invalidEmail', 'User already registered');
  }
  const newUser = await User.create(userData);
  return getToken(newUser);
};

module.exports = {
  create,
};
