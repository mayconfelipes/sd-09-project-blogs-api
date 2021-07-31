const jwt = require('jsonwebtoken');

const userModel = require('./userModel');
const { validateNewUser } = require('../../util/validations');
const { userNotExist } = require('../../util/errorsMessages');

const secret = 'issoehsegredo';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createUser = async (user) => {
  validateNewUser(user);
  const newUser = await userModel.createUser(user);
  const { password, ...userWithoutPassword } = newUser;
  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
  return { token };
};

const allUsers = async () => {
  const result = await userModel.allUsers();
  return result;
};

const findUserById = async (id) => {
  const result = await userModel.findUserById(id);
  if (!result) throw userNotExist;
  return result;
};

const deleteUserMe = async (id) => {
  await userModel.deleteUserMe(id);
};

module.exports = {
  createUser,
  allUsers,
  findUserById,
  deleteUserMe,
};
