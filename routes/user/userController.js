const userService = require('./userService');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_NOT_CONTENT = 204;

const createUser = async (req, res, _next) => {
  const user = req.body;
  const result = await userService.createUser(user);
  res.status(HTTP_STATUS_CREATED).json(result);
};

const allUsers = async (_req, res, _next) => {
  const result = await userService.allUsers();
  res.status(HTTP_STATUS_OK).json(result);
};

const findUserById = async (req, res, _next) => {
  const { id } = req.params;
  const result = await userService.findUserById(id);
  res.status(HTTP_STATUS_OK).json(result);
};

const deleteUserMe = async (req, res, _next) => {
  const { id } = req.user;
  await userService.deleteUserMe(id);
  res.status(HTTP_STATUS_NOT_CONTENT).json('result');
};

module.exports = {
  createUser,
  allUsers,
  findUserById,
  deleteUserMe,
};
