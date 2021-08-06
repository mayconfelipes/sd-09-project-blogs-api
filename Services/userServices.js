const validateError = require('../Utils/validateError');
const Schema = require('../Utils/schemas');

const registerUser = async ({ displayName, email, password, image }) => {
  const { error } = Schema.user.validate({ displayName, email, password });
  if (error) throw validateError(400, error.message);

  const newUser = { displayName, email, password, image };
  return newUser;
};

module.exports = { registerUser };