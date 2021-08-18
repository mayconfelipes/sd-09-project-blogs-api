const { User } = require('../models');
const { generateToken } = require('./token');

const getUserByData = async (field, value) => {
  const user = await User.findOne({ where: { [field]: value } });
  return user;  
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const createNewUser = async (newUser) => {
  await User.create(newUser);
  const { password: _, ...userWithoutPassword } = newUser;
  
  const token = generateToken(userWithoutPassword);
  return token;
};

module.exports = {
  createNewUser,
  getUserByData,
  getAllUsers,
};
