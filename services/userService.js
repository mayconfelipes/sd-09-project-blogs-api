const { User } = require('../models');
const error = require('./error');

const emailValidator = async (email) => {
  if (!email) return error.requiredEmail;
  const regex = await RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
  if (!regex) return error.invalidEmail;
  const emailExists = await User.findOne({ where: { email } });
  // const resultado = emailExists.find((user) => user.email === email);
  if (emailExists) return error.emailAlreadyRegistered;
};

const createUser = async (userData) => {
  const { displayName, password, email } = userData;
  if (!password) return error.requiredPassword;
  if (displayName.length < 8) return error.shortDisplayName;
  if (password.length < 6) return error.shortPassword;
  const isEmailValid = await emailValidator(email);
  if (!isEmailValid) {
  //   console.log(isEmailValid);
  //   console.log(error.emailAlreadyRegistered);
  //   return error.emailAlreadyRegistered;
  const newUser = await User.create(userData);
  console.log(newUser);
  return newUser;
  } return isEmailValid;
};

module.exports = {
  createUser,
};