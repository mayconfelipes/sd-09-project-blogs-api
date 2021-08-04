const { User } = require('../models');
const { schema, validateError } = require('./schemas/userSchema');
const { badRequest, conflict } = require('../helpers/getHttpStatusCode');

const createUser = async (userData) => {
  const { displayName, email, password } = userData;

  const { error } = schema.validate({ displayName, email, password });
  if (error) throw validateError(badRequest, error.message);

  const userEmail = await User.findOne({ email });

  if (userEmail) throw validateError(conflict, 'User already registered');

  const newUser = await User.create(userData);

  return newUser;
};

module.exports = { createUser };
