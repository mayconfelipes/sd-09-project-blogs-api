const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const minNameLength = 8;
const minPassLength = 6;
const emailRegex = /\S+@\S+\.\S+/;

const isUserValid = (displayName, email) => {
  if (displayName && displayName.length < minNameLength) {
    return '"displayName" length must be at least 8 characters long';
  }

  if (!email) return '"email" is required';

  if (!emailRegex.test(email)) return '"email" must be a valid email';
};

const isPassValid = (password) => {
  if (!password) return '"password" is required';

  if (password.length < minPassLength) return '"password" length must be 6 characters long';
};

const validateUser = async (displayName, email, password, image) => {
  const invalidUser = isUserValid(displayName, email);
  const invalidPass = isPassValid(password);

  if (invalidUser) throw new Error(invalidUser);
  if (invalidPass) throw new Error(invalidPass);

  const findOne = await User.findOne({ where: { email } });
  if (findOne) throw new Error('User already registered');

  await User.create({ displayName, email, password, image });

  const token = jwt.sign({ displayName, email, image }, secret, jwtConfig);

  return token;
};

module.exports = {
  validateUser,
 };
