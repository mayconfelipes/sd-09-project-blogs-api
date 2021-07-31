const { User } = require('../models');

const createUser = async (userPayload) => {
  const { displayName, email, password, image } = userPayload;
  await User.create({ displayName, email, password, image });
};

const login = async (userPayload) => {
  const { email, password } = userPayload;
  await User.findOne({ email, password });
};

const getUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getById = async (id) => {
  // const user = await User.findByPk(id, { attributes: { exclude: ['password'] } }); // Busca pela primaryKey
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  return user;
};

module.exports = {
  createUser,
  login,
  getUsers,
  getById,
};
