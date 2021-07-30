const { User } = require('../models');

const createUser = async (displayName, email, password, image) => {
  const results = await User.findAll();
  
  const anyEmail = results.find((user) => user.email === email);

  if (anyEmail) {
    return { error: { message: 'User already registered', code: 'userAlreadyRegistered' } };
  } 

  return User.create({ displayName, email, password, image });
};

const login = async (email, password) => {
  const Allresults = await User.findAll();
  const result = Allresults.find((user) => user.email === email && user.password === password);

  if (!result) {
    return { error: { message: 'Invalid fields', code: 'invalidFields' } };
  }

  return result;
}; 

module.exports = {
  createUser,
  login,
};
