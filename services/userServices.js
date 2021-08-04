const jwt = require('../auth/jwt');

const { User } = require('../models');

const invalidFieldError = (message) => ({ error: { name: 'invalidField', message } });

const displayNameValidation = (displayName) => {
  if (!displayName || displayName.length < 8) {
    const message = '"displayName" length must be at least 8 characters long';
    return { error: { name: 'invalidField', message } };
  }
};
const passwordValidation = (password) => {
  if (!password) return invalidFieldError('"password" is required');
  if (password.length < 6) return invalidFieldError('"password" length must be 6 characters long');
};

const emailValidation = (email) => {
  if (!email) return invalidFieldError('"email" is required');
  const reg = /\S+@\S+\.\S+/;
  if (!reg.test(email)) return invalidFieldError('"email" must be a valid email');
};

const newUserValidation = ({ displayName, email, password }) => {
  const nameNotValid = displayNameValidation(displayName);
  const emailNotValid = emailValidation(email);
  const passwordNotValid = passwordValidation(password);

  if (nameNotValid) return nameNotValid;
  if (emailNotValid) return emailNotValid;
  if (passwordNotValid) return passwordNotValid;
  return { error: false };
};

const isUserByEmailAlreadyExist = async (email) => {
  console.log(email);
  if (await User.findOne({ where: { email } })) { 
    const message = 'User already registered';
    return { error: { name: 'userAlreadyExist', message } };
  }
  return { error: false };
};

const addUser = async (newUserData) => {
  const newUserValidationResponse = newUserValidation(newUserData);
  if (newUserValidationResponse.error) return newUserValidationResponse;

  const { email } = newUserData;
  const userExist = await isUserByEmailAlreadyExist(email);
  if (userExist.error) return userExist;

  await User.create(newUserData);
  const { name } = newUserData;
  const token = jwt.sign({ user: { email, name } });

  return { token };
};

module.exports = {
  addUser,
};