const validateError = require('../Utils/validateError');
const Schema = require('../Utils/schemas');
const { User } = require('../models');

const createUser = async (userData) => {
  const { error } = Schema.user.validate(userData);
  if (error) throw validateError(400, error.message);

  const user = await User.findOne({ where: { email: userData.email } });
  if (user) throw validateError(409, 'User already registered');

  const newUser = await User.create(userData);
  return newUser;
};

const findAll = async () => {
  const listUsers = await User.findAll();
  return listUsers;
};

const findById = async (id) => {
  const user = await User.findByPk(id);
  if (user === null) throw validateError(404, 'User does not exist');
  return user;
};

module.exports = { createUser, findAll, findById };