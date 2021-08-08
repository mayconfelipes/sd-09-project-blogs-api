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
const INVALID_FIELDS = { status: 400, message: 'Invalid fields' };
const USER_DOES_NOT_EXIST = { status: 404, message: 'User does not exist' };

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
  const { password, ...user } = await User.create(newUser);
  // rest operator vai desestruturar password e o "resto" sem o password na variavel user
  return user;
};

const verifyUserRegistration = async (email) => {
  const registeredUser = await User.findOne({ where: { email } });
  return registeredUser;
};

const login = async ({ email, password: psw }) => {
  const registeredUser = await verifyUserRegistration(email);
  if (!registeredUser) throw INVALID_FIELDS;
  const { password, ...user } = await User.findOne({ where: { email, password: psw } });
  return generateToken(user);
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (!user) throw USER_DOES_NOT_EXIST;
  return user;
};

module.exports = {
  createUser,
  login,
  getAllUsers,
  getUserById,
};
