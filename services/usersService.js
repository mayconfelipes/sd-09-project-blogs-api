const { User } = require('../models');
const { generateToken } = require('./utils/tokenValidate');
const { isValidFields } = require('./utils/usersValidate');

const create = async (user) => {
  await isValidFields(user);
  const token = generateToken(user);
  await User.create(user);
  const result = { token };
  return result;
};

module.exports = {
  create,
};
