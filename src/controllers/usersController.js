const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { body } = req;
    const newUser = await userService.createUser(body);
    return res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(err.code).json({ message: err.message });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const usersList = await userService.getAllUsers();

    return res.status(200).json(usersList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const userById = await userService.getUserById(id);

    return res.status(200).json(userById);
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;

    await userService.deleteUser(user);

    return res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
}; 