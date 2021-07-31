const { User } = require('../models');

const createUser = async (userPayload) => {
  const { displayName, email, password, image } = userPayload;
  await User.create({ displayName, email, password, image });
};

module.exports = {
  createUser,
};
