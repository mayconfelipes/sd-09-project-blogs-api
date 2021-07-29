const { User } = require('../models');

const create = async ({ displayName, email, password, image }) => {
  const newUser = await User.create({ displayName, email, password, image });

  return newUser;
};

const getByEmail = async ({ email }) => {
  const findEmail = await User.findOne({ where: { email } });
  return findEmail;
};

module.exports = {
  create,
  getByEmail,
};
