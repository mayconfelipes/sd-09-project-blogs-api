const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');
// const validateUserFields = require('../middlewares/validateUserFields');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};
// algoritmo usado para assinar a mensagem (HMAC-SHA256)

const CONFLICT_ERROR = { status: 409, message: 'User already registered' };

const generateToken = async (user) => {
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return { token };
};

const verifyIfEmailAlreadyExists = async (email) => {
  const emailAlreadyExists = await User.findOne({ where: { email } });
  return emailAlreadyExists;
};

const createUser = async (newUser) => {
  const { email } = newUser;
  const emailAlreadyExists = await verifyIfEmailAlreadyExists(email);
  if (emailAlreadyExists) throw CONFLICT_ERROR;
  // const userFieldsValid = await validateUserFields(newUser);
  // if (!userFieldsValid) return userFieldsValid;
  const user = await User.create(newUser);
  // delete user.password;
  // return generateToken(user);
  return user;
};

const verifyUserRegistration = async (email) => {
  const registeredUser = await User.findOne({ where: { email }});
  return registeredUser;
};

const login = async ({ email, password }) => {
  const registeredUser = await verifyUserRegistration(email);
  if (!registeredUser) return ({ message: 'Invalid fields' });
  const user = await User.findOne({ where: { email, password } })
  delete user.password;
  return generateToken(user);
};

module.exports = {
  createUser,
  login,
};
