require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'ahnumdigo';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const minNameLength = 8;
const minPassLength = 6;
const emailRegex = /\S+@\S+\.\S+/;

const isUserValid = (displayName) => {
  if (displayName && displayName.length < minNameLength) {
    return '"displayName" length must be at least 8 characters long';
  }
};

const isEmailValid = (email) => {
  if (email === undefined) return '"email" is required';

  if (email !== undefined && email.length === 0) return '"email" is not allowed to be empty';

  if (!emailRegex.test(email)) return '"email" must be a valid email';
};

const isPassValid = (password) => {
  if (password === undefined) return '"password" is required';

  if (password !== undefined && password.length === 0) {
    return '"password" is not allowed to be empty';
  }

  if (password.length < minPassLength) return '"password" length must be 6 characters long';
};

const validateUser = async (displayName, email, password, image) => {
  const invalidUser = isUserValid(displayName);
  const invalidEmail = isEmailValid(email);
  const invalidPass = isPassValid(password);

  if (invalidUser) throw new Error(invalidUser);
  if (invalidEmail) throw new Error(invalidEmail);
  if (invalidPass) throw new Error(invalidPass);

  const findOne = await User.findOne({ where: { email } });
  if (findOne) throw new Error('User already registered');

  await User.create({ displayName, email, password, image });

  const token = jwt.sign({ displayName, email, image }, secret, jwtConfig);

  return token;
};

const userLogin = async (email, password) => {
  const isUserEmailValid = isEmailValid(email);
  const isUserPassValid = isPassValid(password);

  if (isUserEmailValid) throw new Error(isUserEmailValid);
  if (isUserPassValid) throw new Error(isUserPassValid);

  const validLogin = await User.findOne({ where: { email } });

  if (!validLogin) throw new Error('Invalid fields');

  const token = jwt.sign({ email, id: validLogin.id }, secret, jwtConfig);
  console.log(validLogin);

  return token;
};

const getUsers = async () => {
  const getAll = await User.findAll();
  return getAll;
};

const getUserById = async (id) => {
  const getById = await User.findOne({ where: { id } });
  if (!getById) throw new Error('User does not exist');
  return getById;
};

module.exports = {
  validateUser,
  userLogin,
  getUsers,
  getUserById,
 };
