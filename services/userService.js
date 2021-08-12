require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const erro = require('../utils/error');

// ------------Create User-------------------------------------------
const verifyIfEmailAlreadyExists = async (email) => {
  const emailToTest = await User.findOne({
    where: {
      email,
    },
  });
  return emailToTest;
};

const createUser = async (newUser) => {
  const { email } = newUser;
  const emailAlreadyExists = await verifyIfEmailAlreadyExists(email);

  if (emailAlreadyExists) throw erro.ERROR_EMAIL_AE;

  const userToCreate = await User.create(newUser);
  return userToCreate;
};
// ------------------------------------------------------------------------

// ------------Login-------------------------------------------------------

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '6h',
  algorithm: 'HS256',
};

const generateToken = async (user) => {
  const token = jwt.sign({ data: user }, secret, jwtConfig);

  return { token };
};

const loginService = async ({ email, password }) => {
  const isUser = await verifyIfEmailAlreadyExists(email);

  if (!isUser) throw erro.INVALID_FIELDS;

  const user = await User.findOne({ where: { email, password } });

  return generateToken(user);
};

// ------------------------------------------------------------------------

const getAllUsersService = async () => {
  const users = await User.findAll();
  return users;
};

module.exports = {
  createUser,
  loginService,
  getAllUsersService,
};