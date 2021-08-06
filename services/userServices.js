const { User } = require('../models');
const { schema, validateError } = require('./schemas/userSchema');
const { badRequest, conflict, notFound } = require('../helpers/getHttpStatusCode');

const createUser = async (userData) => {
  const { displayName, email, password } = userData;

  const { error } = schema.validate({ displayName, email, password });
  if (error) throw validateError(badRequest, error.message);

  const userEmail = await User.findOne({ where: { email } });

  if (userEmail) throw validateError(conflict, 'User already registered');

  const newUser = await User.create(userData);

  return newUser;
};

const findUsers = async () => {
  const users = await User.findAll();
  return users;
};

const findById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) throw validateError(notFound, 'User does not exist');

  return user;
};

module.exports = { createUser, findUsers, findById };
