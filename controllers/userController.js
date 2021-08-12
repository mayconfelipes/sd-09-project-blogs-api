const code = require('../utils/codes');
const {
  createUser,
  loginService,
  getAllUsersService,
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

module.exports = {
  createUserController,
  loginController,
  getAllUsersController,
};