const { User } = require('../models');

const createUser = async (userData) => {
  console.log('[input] > ', userData);
  const newUser = await User.create(userData);
  console.log('[output] > ', newUser);
  return newUser;
};

module.exports = { createUser };
