require('dotenv/config');

const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validateUserEmail } = require('../middlewares/validateForm');

const createUser = async (data) => {
  const emailExist = await validateUserEmail(data);
  if (emailExist) throw new Error('User already registered');
  const newUser = await User.create(data);
  const { email, password } = newUser;
  const token = jwt.sign({ email, password }, process.env.JWT_SECRET);
  return { token };
};

const getUsersAll = async () => {
  const usersAll = await User.findAll({ attributes: { exclude: ['password'] } });
  return usersAll;
};

module.exports = {
  createUser,
  getUsersAll,
};