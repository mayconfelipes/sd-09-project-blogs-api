const { Users } = require('../models');

const getUserByEmail = async (email) => {
  const result = await Users.findOne({ where: { email } });
  return result;
};

module.exports = {
  getUserByEmail,
};
