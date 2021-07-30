const User = require('../services/Users');

const CREATED = 201;
const STATUS_OK = 200;

const addUser = async (req, res) => {
  const userInfo = req.body;
  const token = await User.addUser(userInfo);

  return res.status(CREATED).json({ token });
};

const getAllUsers = async (req, res) => {
  const allUsers = await User.getAllUsers();
  return res.status(STATUS_OK).json(allUsers);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const userById = await User.getUserById(id);
  return res.status(STATUS_OK).json(userById);
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
};
