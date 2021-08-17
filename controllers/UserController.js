// const Sequelize = require('sequelize');
// const config = require('../config/config');
const UserService = require('../services/userService');

// const sequelize = new Sequelize(
//   process.env.NODE_ENV === 'test' ? config.test : config.development
// );

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { code, response } = await UserService.createUser(displayName, email, password, image);

    return res.status(code).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { response, code } = await UserService.getAllUsers();
    res.status(code).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = { createUser, getAllUsers };