const UserService = require('../services/UserService');
const LoginService = require('../services/LoginService');

const { User } = require('../models/index.js');

const STATUS_409 = 409;
const STATUS_404 = 404;
const STATUS_401 = 401;
const STATUS_400 = 400;
const STATUS_201 = 201;
const STATUS_200 = 200;

const registerUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const token = await UserService.registerUser(displayName, email, password, image);
    const emailAlreadyExists = await User.findOne({ where: { email } });
    if (emailAlreadyExists) {
      return res
      .status(STATUS_409)
      .json({ message: 'User already registered' });
    }
    await User.create({ displayName, email, password, image });
    return res
    .status(STATUS_201)
    .json(token);
  } catch (err) {
    return res
    .status(STATUS_400)
    .json({ message: err.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const getToken = await LoginService.userLogin(email, password);
    const userIsValid = await User.findOne({ where: { email, password } });
    if (!userIsValid) {
      return res
      .status(STATUS_400)
      .json({ message: 'Invalid fields' });
    }
    return res
    .status(STATUS_200)
    .json({ token: getToken });
  } catch (err) {
    return res
    .status(STATUS_400)
    .json({ message: err.message });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const result = await User.findAll();
    return res
      .status(STATUS_200)
      .json(result);
  } catch (err) {
    return res
      .status(STATUS_401)
      .json({ message: err.message });
  }
};

const getAllUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res
      .status(STATUS_404)
      .json({ message: 'User does not exist' });
    }
    return res
    .status(STATUS_200)
    .json(user);
  } catch (err) {
    return res
    .status(STATUS_401)
    .json({ message: err.message });
  }
};

module.exports = { 
  registerUser,
  userLogin,
  getAllUsers,
  getAllUsersById,
};