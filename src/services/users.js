require('dotenv').config();
const { User } = require('../models');

const createUser = async (displayName, email, password, image) => {
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    return { error: { message: 'User already registered' } };
  }

  return User.create({ displayName, email, password, image });
};

module.exports = {
  createUser,
};