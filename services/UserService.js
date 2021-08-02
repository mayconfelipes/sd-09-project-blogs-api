const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { errorHandling } = require('../utils');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const schemaUser = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const schemaUserLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const createUser = async (displayName, email, password, image) => {
   const { error } = schemaUser.validate({ displayName, email, password });

  if (error) {
    throw errorHandling(400, error.details[0].message);
  }

  const user = await User.findOne({ where: { email } });

  if (user) {
    throw errorHandling(409, 'User already registered');
  }

  const newUser = await User.create({ displayName, email, password, image });

  const { password: _, ...userWithoutPassword } = newUser.dataValues;

  const token = jwt.sign(userWithoutPassword, secret, jwtConfig);

  return token;
};

const userLogin = async (email, password) => {
  const { error } = schemaUserLogin.validate({ email, password });

  if (error) {
    throw errorHandling(400, error.details[0].message);
  }

  const login = await User.findOne({ where: { email, password } });

  if (!login) {
    throw errorHandling(400, 'Invalid fields');
  }

  const { password: _, ...userWithoutPassword } = login.dataValues;

  const token = jwt.sign(userWithoutPassword, secret, jwtConfig);

  return token;
};

const getAllUser = async () => {
  const users = await User.findAll();

  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw errorHandling(404, 'User does not exist');
  }

  return user;
};

module.exports = {
  createUser,
  userLogin,
  getAllUser,
  getById,
};