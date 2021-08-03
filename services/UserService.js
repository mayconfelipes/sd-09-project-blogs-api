const { User } = require('../models');
const { createToken } = require('../middlewares');

const create = async ({ displayName, email, password, image }) => {
  const user = await User.create({ displayName, email, password, image });
  const token = createToken(user);
  return token;
};

const login = async ({ email }) => {
  const user = await User.findOne({ where: { email } });
  let token = null;
  if (!user) return token;
  token = createToken(user);
  return token;
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