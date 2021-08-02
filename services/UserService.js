const { User } = require('../models');

const create = async ({ displayName, email, password, image }) => {
  const user = await User.create({ displayName, email, password, image });

  return user;
};

const login = async ({ email }) => {
  const user = await User.findOne({ where: { email } });
  
  return user;
};

module.exports = {
  create,
  login,
};