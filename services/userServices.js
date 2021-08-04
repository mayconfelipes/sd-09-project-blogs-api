const { User } = require('../models');
const { schema, validateError } = require('./schemas/userSchema');
const { badRequest } = require('../helpers/getHttpStatusCode');

const createUser = async (userData) => {
  const { image: _, ...body } = userData;
  const { error } = schema.validate(body);
  if (error) throw validateError(badRequest, error.message);

  const newUser = await User.create(userData);
  // console.log('[output] > ', newUser);
  return newUser;
};

module.exports = { createUser };
