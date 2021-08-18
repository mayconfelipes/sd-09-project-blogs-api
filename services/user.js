const { User } = require('../models');

const createUser = async (newUser) => {
  const { displayName, email, password, image } = newUser;

  const conflict = await User.findOne({ where: { email } });

  if (conflict) return { message: 'User already registered', statusCode: 409 };

  const user = await User.create({ displayName, email, password, image });

  return user;
};

const readUsers = () => User.findAll({ attributes: { exclude: ['password'] } });

const readUser = async (id) => {
  const found = await User.findByPk(id, { attributes: { exclude: ['password'] } });

  if (!found) return { message: 'User does not exist', statusCode: 404 };

  return found;
};

module.exports = {
  createUser,
  readUsers,
  readUser,
};
