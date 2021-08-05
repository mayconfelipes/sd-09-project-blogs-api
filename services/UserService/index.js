const { User } = require('../../models');
const { verifyToken } = require('../jwt');

module.exports = async (token) => {
  await verifyToken(token);
  const users = await User.findAll({});

  return users;
};
