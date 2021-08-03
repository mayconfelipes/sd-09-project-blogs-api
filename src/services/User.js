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

const findByPk = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return {
      err: {
        message: 'User does not exist',
      },
    };
  }

  console.log(user);

  return user;
};

module.exports = {
  create,
  getByEmail,
  findAll,
  findByPk,
};
