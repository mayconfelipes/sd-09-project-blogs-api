const jwt = require('jsonwebtoken');

require('dotenv/config');

const jwtConfig = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const isValidPassword = (password) => {
  if (!password) throw new Error('"password" is required');
  if (password.length < 6) throw new Error('"password" length must be 6 characters long');
  return undefined;
};

const isValidUser = (displayName, email) => {
    const regex = /.+@[A-z]+[.]com/; 
  if (displayName.length < 8) {
    throw new Error('"displayName" length must be at least 8 characters long');
  }
  if (!email) throw new Error('"email" is required');
  if (!regex.test(email)) throw new Error('"email" must be a valid email');
  return undefined;
};

const registerUser = async (displayName, email, password, image) => {
  const userIsNotValid = isValidUser(displayName, email);
  const passwordIsNotValid = isValidPassword(password);

  if (userIsNotValid) throw new Error(userIsNotValid);
  if (passwordIsNotValid) throw new Error(passwordIsNotValid);

  const token = jwt.sign({ displayName, email, image }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

module.exports = {
  registerUser,
};