require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;
const emailExistsMessage = { code: 409, message: 'User already registered' };

const noUserMessage = { code: 404, message: 'User does not exist' };

const validateUserInfo = (data) =>
  Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.string(),
  }).validate(data);
const validateUserEmail = async (data) => {
  const { email } = data;
  const userEmail = await User.findOne({ where: { email } });
  if (userEmail) return true;
};
const createUser = async (data) => {
  const { error } = validateUserInfo(data);
  if (error) {
    const userInfoResponse = { code: 400, message: error.details[0].message };
    throw userInfoResponse;
  }
  
  const emailExists = await validateUserEmail(data);
  if (emailExists) throw emailExistsMessage;
  const newUser = await User.create(data);
  const { email, password } = newUser;
  const token = jwt.sign({ email, password }, JWT_SECRET);
  return { token };
};

const getAllUsers = async () => {
  const usersList = await User.findAll();
  return usersList;
};

const getUserById = async (id) => {
  const userValid = await User.findOne({ where: { id } });
  if (!userValid) throw noUserMessage;

  const userById = await User.findByPk(id);
  return userById;
};

const deleteUser = async (user) => {
  const { id } = user;
  const deletedUser = await User.destroy({ where: { id } });

  return deletedUser;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
}; 