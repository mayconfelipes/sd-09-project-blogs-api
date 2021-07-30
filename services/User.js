const { User } = require('../models');

const createUser = async (displayName, email, password, image) => {
  const results = await User.findAll();
  
  const anyEmail = results.find((user) => user.email === email);

  if (anyEmail) {
    return { error: { message: 'User already registered', code: 'userAlreadyRegistered' } };
  } 

  return User.create({ displayName, email, password, image });
};

module.exports = {
  createUser,
};
