require('dotenv');

const jwt = require('jsonwebtoken');
const error = require('./error');

const SECRET = process.env.JWT_SECRET;

const generateToken = (email, password) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ email, password }, SECRET, jwtConfig);
  return token;
};

const isInvalidLogin = async (email, password) => {
  if (email === '') return error.emptyEmail;
  if (!email) return error.requiredEmail;
  if (password === '') return error.emptyPassword;
  if (!password) return error.requiredPassword;
  return null;
};

module.exports = {
  generateToken,
  isInvalidLogin,
};