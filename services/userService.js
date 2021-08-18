const joi = require('joi');
const { User } = require('../models');
const { messages, codes, objectError, objectResponse } = require('../util/responseHandling');
const { createToken } = require('../util/tokenGenerate');

const userValidator = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string().length(6).required(),
  image: joi.string(),
});

const createUser = async (displayName, email, password, image) => {
  const { error } = userValidator.validate({ displayName, email, password, image });
  if (error) return objectError(error.details[0].message, codes.CODE_400);

  const userExists = await User.findOne({ where: { email } });
  if (userExists) return objectError(messages.USER_ALREADY_EXISTS, codes.CODE_409);

  await User.create({ displayName, email, password, image });
  return createToken({ email, password }, codes.CODE_201);
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return objectResponse(users, codes.CODE_200);
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (!user) return objectError(messages.USER_NOT_EXIST, codes.CODE_404);
  return objectResponse(user, codes.CODE_200);
};

const getUserByEmail = async (email) => {
  const { id } = await User.findOne({ where: { email } });
  return id;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
  return objectResponse(null, codes.CODE_204);
};

module.exports = { createUser, getAllUsers, getUserById, getUserByEmail, deleteUser };