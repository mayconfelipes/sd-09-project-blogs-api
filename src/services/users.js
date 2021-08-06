const { User } = require('../models');

const create = async (userInfo) => {
  const newUser = await User.create(userInfo);
  return {
    status: 201,
    newUser,
  };
};

module.exports = { create };