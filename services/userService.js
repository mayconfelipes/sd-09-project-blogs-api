const jwt = require('jsonwebtoken');
const { User } = require('../models');

const validateDisplayName = (name) => {
  const error = { status: 400, message: '"displayName" length must be at least 8 characters long' };
  if (name.length < 8) {
    throw error;
  }
};

const validateEmail = async (email) => {
  const regex = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
  const invalidEmail = { status: 400, message: '"email" must be a valid email' };
  const emailNotFound = { status: 400, message: '"email" is required' };
  if (!email) throw emailNotFound;
  if (!regex) throw invalidEmail;
  const emailExists = await User.findOne({ where: { email } });
  const emailAlreadyUsed = { status: 409, message: 'User already registered' };
  if (emailExists) throw emailAlreadyUsed;
};

const validatePassword = (password) => {
  const pwLengthError = { status: 400, message: '"password" length must be 6 characters long' };
  const pwNotFound = { status: 400, message: '"password" is required' };
  if (!password) throw pwNotFound;
  if (password.length < 6) throw pwLengthError;
};

const jwtGenerator = (user) => {
  const { displayName, email, image } = user;
  const secret = process.env.JWT_SECRET;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ displayName, email, image }, secret, jwtConfig);
  return token;
};

const create = async (body) => {
  const { displayName, email, password, image } = body;
  validateDisplayName(displayName);
  await validateEmail(email);
  validatePassword(password);
  await User.create({ displayName, email, password, image });
  const token = jwtGenerator(body);
  return { token };
};

module.exports = {
  create,
};
