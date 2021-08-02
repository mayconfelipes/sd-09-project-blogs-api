const rescue = require('express-rescue');
const UserService = require('../services/UserService');

const createUser = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const token = await UserService.createUser(displayName, email, password, image);

  return res.status(201).json({ token });
});

const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;

  const token = await UserService.userLogin(email, password);

  return res.status(200).json({ token });
});

const getAllUser = rescue(async (_req, res) => {
  const users = await UserService.getAllUser();

  return res.status(200).json(users);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const user = await UserService.getById(id);

  return res.status(200).json(user);
});

module.exports = {
  createUser,
  userLogin,
  getAllUser,
  getById,
};