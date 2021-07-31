const { User } = require('../models');
// const { emailAlreadyExists } = require('../middlewares');

const createUser = async (userPayload) => {
  const { displayName, email, password, image } = userPayload;
  await User.create({ displayName, email, password, image });
  return userPayload.token;
};

module.exports = {
  createUser,
};
