const rescue = require('express-rescue');
const User = require('../services/UsersService');

const create = rescue(async (req, res) => {
  const { email, displayName, password, image } = req.body;

  const token = await User.create(email, displayName, password, image);

  return res.status(201).json({ token });
});

const login = rescue(async (req, res) => {
  const { email, password } = req.body;

  const token = await User.login(email, password);

  return res.status(200).json({ token });
});

const getAll = async (_req, res) => {
  const users = await User.getAll();

  return res.status(200).json(users);
};

const getOne = rescue(async (req, res) => {
  const { id } = req.params;
  const user = await User.getOne(id);

  return res.status(200).json(user);
});

module.exports = {
  create,
  login,
  getAll,
  getOne,
};