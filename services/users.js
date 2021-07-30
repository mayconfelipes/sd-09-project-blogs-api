const { User } = require('../models');

const create = async (userInfo) => {
  const { email } = userInfo;
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    return {
      error: { statusCode: 409, message: 'User already registered' },
    };
  }

  return User.create(userInfo);
};

const getAll = async () => {
  const usersList = await User.findAll();
  return usersList;
};

module.exports = {
  create,
  getAll,
};
