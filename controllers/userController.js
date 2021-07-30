const {
  registerUserService,
  getAllUsersService,
  getUserByIdService,
  deleteSelfUserService,
} = require('../services/userService');

const registerUserController = async (req, res, next) => {
  const { body: { displayName, email, password, image } } = req;
  const result = await registerUserService({ displayName, email, password, image });
  if (!result.token) {
    const { error } = result;
    return next(error);
  }
  return res.status(201).json(result);
};

const getAllUsersController = async (_req, res) => {
  const result = await getAllUsersService();
  return res.status(200).json(result);
};

const getUserByIdController = async (req, res, next) => {
  const { params: { id } } = req;
  const result = await getUserByIdService(id);
  if (!result.response) {
    return next(result);
  }
  const { response } = result;
  return res.status(200).json(response);
};

const deleteSelfUserController = async (req, res) => {
  const { payload } = req;
  await deleteSelfUserService(payload.id);
  return res.status(204).end();
};

module.exports = {
  registerUserController,
  getAllUsersController,
  getUserByIdController,
  deleteSelfUserController,
};
