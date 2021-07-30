const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const services = require('../services');
require('dotenv').config();

const secret = process.env.SECRET;

const listAllUsers = rescue(async (req, res, _next) => {
  const users = await User.findAll();
  console.log(users);

  return res.status(200).json(users);
});

const findUserById = rescue(async (req, res, _next) => {
  const { id } = req.params;

  const user = await User.findAll({
    where: { id },
  });

  res.status(200).json(user);
});

const createUser = rescue(async (req, res, _next) => {
  const newUser = await services.createUser(req.body);
  console.log(newUser);
  const { displayName, email } = newUser;

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
