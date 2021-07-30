const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const services = require('../services');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const listAllUsers = rescue(async (req, res, _next) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return res.status(200).json(users);
});

const findUserById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const [user] = await User.findAll({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  if (!user) return next({ statusCode: 404, message: 'User does not exist' });

  res.status(200).json(user);
});

const createUser = rescue(async (req, res, _next) => {
  const user = await services.createUser(req.body);
  const { displayName, email } = user;

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ displayName, email }, secret, jwtConfig);

  res.status(201).json(token);
});

module.exports = {
  listAllUsers,
  findUserById,
  createUser,
};
