const { User } = require('../models');
const { NOT_FOUND } = require('../utils/httpStatus');
const { isValidFields } = require('./utils/usersValidate');
const { generateToken, isValidToken } = require('./utils/tokenValidate');

const create = async (user) => {
  await isValidFields(user);
  const userData = await User.create(user);
  const token = generateToken(userData.dataValues);
  const result = { token };
  return result;
};

const findAll = async (authorization) => {
  isValidToken(authorization);
  const result = await User.findAll(
    { attributes: { exclude: ['password'] } },
  );
  return result;
};

const findById = async (authorization, id) => {
  isValidToken(authorization);
  const result = await User.findByPk(
    id,
    { attributes: { exclude: ['password'] } },
  );

  if (!result) {
    const error = { type: NOT_FOUND, message: 'User does not exist' };
    throw error;
  }
  return result;
};

module.exports = {
  create,
  findAll,
  findById,
};
