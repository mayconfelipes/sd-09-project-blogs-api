const { User } = require('../models');
const Errors = require('../util/errors');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });

  if (!user) throw new Errors.InvalidCredentials();

  const { password: removed, ...userWithoutPassword } = user.dataValues;

  return userWithoutPassword;
};

module.exports = {
  login,
};