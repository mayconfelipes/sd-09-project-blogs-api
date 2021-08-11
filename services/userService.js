const {
  user,
} = require('../models');
require('dotenv/config');

const { userModel } = require('../models/user');

const ERROR_EMAIL_AE = {
  status: 409,
  message: 'User already registered',
};

const verifyIfEmailAlreadyExists = async (email) => {
  const emailAlreadyExists = await user.findOne({
    where: {
      email,
    },
  });
  return emailAlreadyExists;
};

const createUser = async (newUser) => {
  const { email } = newUser;
  const emailAlreadyExists = await verifyIfEmailAlreadyExists(email);

  if (emailAlreadyExists) throw ERROR_EMAIL_AE;
  const userToCreate = await userModel.create(newUser);
  return userToCreate;
};

module.exports = {
  createUser,
};