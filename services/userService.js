const { User } = require('../models');

const createUser = async ({ displayName, password, email, image }) => {
  const userAlreadyExists = await User.findOne({ email });
  console.log(userAlreadyExists);

  const errorMessage = {
    error: {
      code: 'userAlreadyRegistred',
      message: 'User already registered',
    },
  };

  if (userAlreadyExists) return errorMessage;

  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
};

module.exports = {
  createUser,
};