const code = require('../utils/codes');
const {
  createUser,
  loginService,
  getAllUsersService,
  getUserByIdService,
  deleteUserService,
} = require('../services/userService');

const createUserController = async (req, res) => {
  const userToAdd = req.body;
  const result = await createUser(userToAdd);

  return res.status(code.CREATED).json(result);
};

const loginController = async (req, res) => {
  const user = req.body;
  const token = await loginService(user);

  return res.status(code.OK).json(token);
};

const getAllUsersController = async (_req, res) => {
  const users = await getAllUsersService();

  return res.status(code.OK).json(users);
};

const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  const user = await getUserByIdService(id);

  return res.status(code.OK).json(user);
};

const deleteUserController = async (req, res) => {
  const { id } = req.user;
  await deleteUserService(id);

  return res.status(code.NO_CONTENT).json();
};

module.exports = {
  createUserController,
  loginController,
  getAllUsersController,
  getUserByIdController,
  deleteUserController,
};