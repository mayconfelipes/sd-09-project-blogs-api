const UserService = require('../services/userService');
const { messages, codes } = require('../util/responseHandling');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { code, response } = await UserService.createUser(displayName, email, password, image);

    return res.status(code).json(response);
  } catch (error) {
    res.status(codes.CODE_500).json({ message: messages.UNEXPECTED_ERROR, error });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const { response, code } = await UserService.getAllUsers();
    res.status(code).json(response);
  } catch (error) {
    res.status(codes.CODE_500).json({ message: messages.UNEXPECTED_ERROR, error });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { response, code } = await UserService.getUserById(id);
    res.status(code).json(response);
  } catch (error) {
    res.status(codes.CODE_500).json({ message: messages.UNEXPECTED_ERROR, error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req;
    const { response, code } = await UserService.deleteUser(id);
    res.status(code).json(response);
  } catch (error) {
    res.status(codes.CODE_500).json({ message: messages.UNEXPECTED_ERROR, error });
  }
};

module.exports = { createUser, getAllUsers, getUserById, deleteUser };