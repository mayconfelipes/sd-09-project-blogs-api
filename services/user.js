const { User } = require('../models');
const Errors = require('../util/errors');

const create = async (displayName, email, password, image) => {
  const userIsRegistered = await User.findOne({ where: { email } });

  if (userIsRegistered) throw new Errors.EmailAlreadyExist();

  const { _password, ...user } = await User.create({ displayName, email, password, image });

  return user;
};

module.exports = {
  create,
};