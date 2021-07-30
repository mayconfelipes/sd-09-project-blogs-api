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

  console.log(result);

  if (!result) {
    return { error: { message: 'Invalid fields', code: 'invalidFields' } };
  }

  return result;
};

const getAllUsers = async () => {
  const Allresults = await User.findAll();

  const newResult = Allresults.map((result) => {
    const { password, ...otherInfo } = result.dataValues;
    return otherInfo;
  });

  return newResult;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return { error: { message: 'User does not exist', code: 'userDoesntExist' } };
  }

  const { password, ...otherInfo } = user.dataValues;
  return otherInfo;
};

module.exports = {
  createUser,
  login,
  getAllUsers,
  getUserById,
};
