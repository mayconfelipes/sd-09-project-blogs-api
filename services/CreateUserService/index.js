const validateUserData = require('../validateUserData');
const { createToken } = require('../../middlewares/Auth/jwt');
const { User } = require('../../models');

module.exports = async (userData) => {
  await validateUserData(userData);
  await User.create(userData);

  const token = await createToken(userData);

  return token;
};
