const { User } = require('../models');

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const create = async (displayName, email, password, image) => {
  const user = await getByEmail(email);

  if (user) {
    return {
      err: {
        message: 'User already registered',
      },
    };
  }

  return User.create({ displayName, email, password, image });
};

const findAll = async () => {
  const users = await User.findAll();

  return users;
};

module.exports = {
  create,
  getByEmail,
  findAll,
};
