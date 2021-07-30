const { User } = require('../models');
const { generateToken, isValidToken } = require('./utils/tokenValidate');
const { isValidFields } = require('./utils/usersValidate');

const create = async (user) => {
  await isValidFields(user);
  const token = generateToken(user);
  await User.create(user);
  const result = { token };
  return result;
};

const findAll = async (authorization) => {
  isValidToken(authorization);
  const result = await User.findAll(
    { attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } },
  );
  return result;
};

module.exports = {
  create,
  findAll,
};
