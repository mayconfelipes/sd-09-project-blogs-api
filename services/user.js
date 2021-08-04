const { User } = require('../models');
const Errors = require('../util/errors');

const create = async (displayName, email, password, image) => {
  const userIsRegistered = await User.findOne({ where: { email } });

  if (userIsRegistered) throw new Errors.EmailAlreadyExist();

  const { _password, ...user } = await User.create({ displayName, email, password, image });

  return user;
};

const findAll = () => User.findAll().then((users) => users.map(({ dataValues }) => {
  const { password, ...user } = dataValues;
  return user;
}));

const findById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) throw new Errors.ContentNotFound('User');

  const { dataValues } = user;
  const { password, ...userWithoutPassword } = dataValues;

  return userWithoutPassword;
};

module.exports = {
  create,
  findAll,
  findById,
};