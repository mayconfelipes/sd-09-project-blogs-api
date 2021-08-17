require('dotenv').config();
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const userSchema = require('../schema/user');
const loginSchema = require('../schema/login');
const { User } = require('../models');

const findUserExisting = async (email) => {
  const result = await User.findAll({ where: { email } });
  if (result.length > 0) throw boom.conflict('User already registered');
};

const createToken = (id, email) => {
  const secret = process.env.JWT_SECRET;

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { id, email } }, secret, jwtConfig);
  return token;
};

const createUser = async (payload) => {
  const { displayName, email, password } = payload;
  const { error } = userSchema.validate({ displayName, email, password });
  if (error) throw error;

  await findUserExisting(email);

  const user = await User.create(payload);

  const result = createToken(user.id, user.email);
  
  return result;
};

const validUser = async (email, password) => {
  const userExisting = await User.findAll({ where: { email } });
  
  if (!userExisting[0] || userExisting[0].dataValues.password !== password) {
    throw boom.badRequest('Invalid fields');
  }

  const user = {
    id: userExisting[0].dataValues.id,
    email: userExisting[0].dataValues.email,
  };

  return user;
};

const login = async ({ email, password }) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw error;

  const user = await validUser(email, password);

  const result = createToken(user.id, user.email);

  return result;
};

const getAll = async () => {
  const result = await User.findAll();

  return result;
};

const getUserById = async (id) => {
  const result = await User.findByPk(id);

  if (!result) throw boom.notFound('User does not exist');

  return result;
};

module.exports = {
  createUser,
  login,
  getAll,
  getUserById,
};
