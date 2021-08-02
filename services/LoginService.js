const jwt = require('jsonwebtoken');

require('dotenv/config');

const jwtConfig = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const userIsValid = (email, password) => {
  if (email === undefined) throw new Error('"email" is required');
  if (password === undefined) throw new Error('"password" is required');
  if (email.length === 0) throw new Error('"email" is not allowed to be empty');
  if (password.length === 0) throw new Error('"password" is not allowed to be empty');
  return undefined;
};

const userLogin = async (email, password) => {
  const userIsNotValid = userIsValid(email, password);
  if (userIsNotValid) throw new Error(userIsNotValid);
  
  const token = jwt.sign({ email, password }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

module.exports = {
  userLogin,
};