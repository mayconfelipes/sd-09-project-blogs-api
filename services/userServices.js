const jwt = require('../auth/jwt');

const { User } = require('../models');

const { displayNameValidation, passwordValidation, emailValidation } = require('./validations');

const newUserValidation = async ({ displayName, email, password }) => {
  const nameNotValid = await displayNameValidation(displayName);
  const emailNotValid = await emailValidation(email);
  console.log(emailNotValid);
  const passwordNotValid = await passwordValidation(password);

  if (nameNotValid.error) {
    console.log('name não valido');
    return nameNotValid;
 }
  if (emailNotValid.error) {
    console.log('Email não valido');
    return emailNotValid;
 }
  if (passwordNotValid.error) {
    console.log('pass não valido');
    return passwordNotValid;
 }
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
  const newUserValidationResponse = await newUserValidation(newUserData);
  console.log(newUserValidationResponse);
  if (newUserValidationResponse.error) return newUserValidationResponse;

  const { email } = newUserData;
  const userExist = await isUserByEmailAlreadyExist(email);
  if (userExist.error) return userExist;

  await User.create(newUserData);
  const { name } = newUserData;
  const token = jwt.sign({ user: { email, name } });

  return { token };
};

const getAllUsers = async (authorization) => {
  const response = jwt.verify(authorization);
  if (response.error) return response;
  return User.findAll({ raw: true });
 };

 const getUserById = async ({ authorization, id }) => {
  const response = jwt.verify(authorization);
  if (response.error) return response;
  const user = await User.findOne({ where: { id } });
  if (user) {
    return user;
  }
  const message = 'User does not exist';
  return { error: { name: 'userDoesNotExist', message } };
 };

 const deleteUser = async ({ authorization }) => {
  const responseJWT = jwt.verify(authorization);
  console.log(responseJWT);
  if (responseJWT.error) return responseJWT;

  const { id } = responseJWT.user;
  const result = await User.destroy({ where: { id } });
  if (result) return { error: false };
  return { error: { name: 'Unauthorized', message: 'User not deleted' } };
 };

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  deleteUser,
};