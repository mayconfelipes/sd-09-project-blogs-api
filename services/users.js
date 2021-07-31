const { User } = require('../models');

const createUser = async (userPayload) => {
  const { displayName, email, password, image } = userPayload;
  await User.create({ displayName, email, password, image });
};

const login = async (userPayload) => {
  const { email, password } = userPayload;
  await User.findOne({ email, password });
};

module.exports = {
  createUser,
  login,
};
