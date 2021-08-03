const { User } = require('../models');
const error = require('./error');
const auth = require('./auth');

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
    const newUser = await User.create(userData);
    return newUser;
  } return isEmailValid;
};

const logIn = async ({ email, password }) => {
  const checkData = await auth.isInvalidLogin(email, password);
  if (checkData !== null) {
    return checkData;
  }
  const validUser = await User.findOne({ where: { email, password } });
  if (validUser) {
    return auth.generateToken(email, password);
  }
  return error.invalidFields;
  };

module.exports = {
  createUser,
  logIn,
};