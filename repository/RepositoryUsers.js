const { User } = require('../models');

const create = async ({ displayName, email, password, image }) => {
  const newUser = await User.create({ displayName, email, password, image });

  return newUser.dataValues;
};

const getByEmail = async ({ email }) => {
  const findEmail = await User.findOne({ where: { email } });
  return findEmail;
};

const getAll = async () => {
  const getAllUsers = await User.findAll();

  return getAllUsers;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const deleteMe = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  create,
  getByEmail,
  getAll,
  getUserById,
  deleteMe,
};
