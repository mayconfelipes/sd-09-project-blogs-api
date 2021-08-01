const rescue = require('express-rescue');
const User = require('../services/UsersService');

const create = rescue(async (req, res) => {
  const { email, displayName, password, image } = req.body;

  const user = await User.create(email, displayName, password, image);

  return res.status(201).json(user);
});

const login = rescue(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.login(email, password);

  return res.status(200).json(user);
});

module.exports = {
  create,
  login,
};