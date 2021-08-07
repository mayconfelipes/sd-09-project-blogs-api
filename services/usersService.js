const { User } = require('../models');
const { newToken } = require('../auxiliarFunctions/jwtFunctions');

const createUser = async (user) => {
  const checkUser = await User.findOne({ where: { email: user.email } });
  if (checkUser) {
    const err = new Error('User already registered');
    err.status = 409;
    throw err;
  }
  const { dataValues: newUser } = await User.create(user);
  delete newUser.password;
  return newToken(newUser);
};

const loginUser = async (login) => {
  const checkLogin = await User.findOne({ where: { ...login } });
  if (!checkLogin) {
    const err = new Error('Invalid fields');
    err.status = 400;
    throw err;
  }
  const { dataValues: logedUser } = checkLogin;
  delete logedUser.password;
  return newToken(logedUser);
};

const getAllUsers = async () => {
  const usersList = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return usersList.map((user) => user.dataValues);
};

const getUserById = async (id) => {
  const foundUser = await User.findByPk(id, {
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  if (!foundUser) {
    const err = new Error('User does not exist');
    err.status = 404;
    throw err;
  }
  const { dataValues: userById } = foundUser;
  return userById;
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
};
