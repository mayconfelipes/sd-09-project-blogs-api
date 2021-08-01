const jwt = require('jsonwebtoken');
const { User } = require('../models');

const validateUser = async (userInfo) => {
  const { email, password } = userInfo;
  const user = await User.findOne({ where: { email, password } });
  if (!user) {
    const error = { status: 400, message: 'Invalid fields' };
    throw error;
  }
};

const validateEmptyFields = (email, password) => {
  const emptyEmail = { status: 400, message: '"email" is not allowed to be empty' };
  if (email.length === 0) throw emptyEmail;
  const emptyPassword = { status: 400, message: '"password" is not allowed to be empty' };
  if (password.length === 0) throw emptyPassword;
};

const validateNotFoundFields = (email, password) => {
  const emailNotFound = { status: 400, message: '"email" is required' };
  if (email === undefined) throw emailNotFound;
  const passwordNotFound = { status: 400, message: '"password" is required' };
  if (password === undefined) throw passwordNotFound;
};

const jwtGenerate = (userInfo) => {
  const secret = process.env.JWT_SECRET;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ userInfo }, secret, jwtConfig);
  return token;
};

const login = async (userInfo) => {
  const { email, password } = userInfo;
  validateNotFoundFields(email, password);
  validateEmptyFields(email, password);
  await validateUser(userInfo);
  const token = jwtGenerate(email);
  return token;
};

module.exports = {
  login,
};