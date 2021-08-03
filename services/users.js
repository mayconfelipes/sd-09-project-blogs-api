require('dotenv').config();
const { User } = require('../models');
const response = require('../helpers/response');
const generateToken = require('../auth/generateToken');
const validateUser = require('../helpers/validateUser');
const validateLogin = require('../helpers/validateLogin');
const userExists = require('../helpers/userExists');

const signIn = async (displayName, email, password, image) => {
  const userValidation = validateUser(displayName, password, email);
  if (userValidation.status !== 200) return response(userValidation.status, userValidation.message);

  const emailValidation = await userExists(email);
  if (emailValidation.status !== 200) {
    return response(emailValidation.status, emailValidation.message);
  }

  try {
    const newUser = await User.create({ displayName, email, password, image });
    if (newUser) {
      const payload = { email: newUser.email };
      const token = generateToken(payload);
      return { status: 201, token };
    }
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

const login = async (userEmail, userPassword) => {
  const fieldsValidation = validateLogin(userEmail, userPassword);
  if (fieldsValidation.status !== 200) {
    return response(fieldsValidation.status, fieldsValidation.message);
  }

  try {
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user || user.password !== userPassword) return response(400, 'Invalid fields');
    const payload = { email: user.email };
    const token = generateToken(payload);
    return { status: 200, token };
  } catch (error) {
    return response(500, error.message);
  }
};

const getAll = async () => {
  try {
    const users = await User.findAll();
    return {
      status: 200,
      users,
    };
  } catch (error) {
    return response(500, error.message);
  }
};

const getById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) return response(404, 'User does not exist');
    return {
      status: 200,
      user,
    };
  } catch (error) {
    return response(500, error.message);
  }
};

module.exports = {
  signIn,
  login,
  getAll,
  getById,
};