const userService = require('../service/users');

const createUser = async (req, res, _next) => {
  const { displayName, email, password, image } = req.body;
  const response = await userService.createNewUser(displayName, email, password, image);
  res.status(201).json(response);
};

const getUsers = async (req, res, _next) => {
  const users = await userService.getAll();
  res.status(200).json(users);
};

module.exports = {
  createUser,
  getUsers,
};
