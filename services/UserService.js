const { User } = require('../models');

const create = async ({ displayName, email, password, image }) => {
  const user = await User.create({ displayName, email, password, image });

  return user;
};

const login = async ({ email }) => {
  const user = await User.findOne({ where: { email } });
  
  return user;
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getById = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
};
module.exports = {
  create,
  login,
  getAll,
  getById,
};