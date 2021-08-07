const usersService = require('../services/usersService');

const createUser = async (req, res, next) => {
  try {
    const user = req.body;
    const token = await usersService.createUser(user);
    return res.status(201).json({ token });
  } catch (err) { next(err); }
};

const loginUser = async (req, res, next) => {
  try {
    const login = req.body;
    const token = await usersService.loginUser(login);
    return res.status(200).json({ token });
  } catch (err) { next(err); }
};

const getUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      const usersList = await usersService.getAllUsers();
      return res.status(200).json(usersList);
    }
    const userById = await usersService.getUserById(id);
    return res.status(200).json(userById);
  } catch (err) { next(err); }
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
};
