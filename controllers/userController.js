const User = require('../services/userService');

const addUser = async (req, res) => {
  const userData = req.body;
  try {
    const createUser = await User.addUser(userData);
    if (createUser.error) {
      return res.status(createUser.error.code)
      .json({ message: createUser.error.message });
    }
    return res.status(201).json(createUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal Error', error });
  }
};

const getAllUsers = async (_req, res) => {
  const allUsers = await User.getAllUsers();
  return res.status(200).json(allUsers);
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const userFromDB = await User.getById(id);
    if (userFromDB.error) {
      return res.status(userFromDB.error.code).json({ message: userFromDB.error.message });
    }
    return res.status(200).json(userFromDB);
  } catch (error) {
    res.status(500).json({ message: 'Internal Error', error });
  }
};

const login = async (req, res) => {
  const userLogin = req.body;
  try {
    const loginResponse = await User.login(userLogin);
    if (loginResponse.error) {
      return res.status(loginResponse.error.code)
      .json({ message: loginResponse.error.message }); 
    }
    return res.status(200).json(loginResponse);
  } catch (error) {
    res.status(500).json({ message: 'Internal Error', error });
  }
};

const deleteMe = async (req, res) => {
  const { id } = req.user;
  await User.deleteMe(id);
  res.status(204).json();
};

module.exports = {
  addUser,
  getAllUsers,
  getById,
  login,
  deleteMe,
};