const { User } = require('../models');
const { generateToken, validateToken } = require('./token');

const getUserByData = async (field, value) => {
  const user = await User.findOne({ where: { [field]: value } });
  return user;  
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

const createNewUser = async (newUser) => {
  await User.create(newUser);
  const { password: _, ...userWithoutPassword } = newUser;
  
  const token = generateToken(userWithoutPassword);
  return token;
};

const removeUser = async (token) => {
  const validToken = await validateToken(token);
  if (validToken.status) return { message: validToken.message };

  const deleted = await User.destroy({ where: { email: validToken } });
  return deleted;
};

module.exports = {
  createNewUser,
  getUserByData,
  getAllUsers,
  getUserById,
  removeUser,
};
