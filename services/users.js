const { Users } = require('../models');

const getUserByEmail = async (email) => {
  const result = await Users.findOne({ where: { email } });
  return result;
};

const createUser = async (displayName, email, password, image) => {
  const result = await Users.create({ displayName, email, password, image });
  return result;
};

module.exports = {
  getUserByEmail,
  createUser,
};
