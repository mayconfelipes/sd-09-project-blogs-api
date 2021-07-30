const userModels = require('../models/userModels');
const generateError = require('../auxiliarFunctions/generateError');
const createToken = require('../auxiliarFunctions/createToken');

const postNewUser = async (userData) => {
  const result = await userModels.postNewUser(userData);

  if (!result) throw (generateError('conflict', 'User already registered'));

  const { password, ...tokenData } = userData;

  const token = createToken(tokenData);

  return { token };
};

const getAllUsers = async () => {
  const result = await userModels.getAllUsers();

  return result;
};

const getUserById = async (id) => {
  const result = await userModels.getUserById(id);

  if (!result) throw generateError('notFound', 'User does not exist');

  return result;
};

const deleteMe = async (userId) => {
  const user = await getUserById(userId);

  if (!user) return generateError('notFound', 'User not found');

  const result = await userModels.deleteMe(userId);

  return result;
};

module.exports = {
  postNewUser,
  getAllUsers,
  getUserById,
  deleteMe,
};
