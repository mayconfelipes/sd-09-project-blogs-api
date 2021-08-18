const rescue = require('express-rescue');
const userService = require('../services/users');

const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_NO_CONTENT = 204;

const createUser = rescue(async (req, res) => {
  const payload = req.body;

  const result = await userService.createUser(payload);

  return res.status(HTTP_STATUS_CREATED).json({ token: result });
});

const getAllUsers = rescue(async (_req, res) => {
  const result = await userService.getAll();

  return res.status(HTTP_STATUS_OK).json(result);
});

const getUserById = rescue(async (req, res) => {
  const { id } = req.params;

  const result = await userService.getUserById(id);

  return res.status(HTTP_STATUS_OK).json(result);
});

const deleteMyself = rescue(async (req, res) => {
  const userId = req.user.id;

  await userService.deleteMyself(userId);

  return res.status(HTTP_STATUS_NO_CONTENT).end();
});

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteMyself,
};
