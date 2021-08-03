const jwt = require('jsonwebtoken');
const { User } = require('../models');
const CustomError = require('../utils/CustomError');

const getToken = ({ id, displayName, email }) => jwt
  .sign(
    { id, displayName, email },
    process.env.JWT_SECRET,
    { expiresIn: '1h', algorithm: 'HS256' },
  );

const getByEmail = async (email) => User.findOne({ where: { email } });

const getByPassword = async (password) => User.findOne({ where: { password } });

const create = async (data) => {
  const userEmail = await getByEmail(data.email);
  if (userEmail) {
    throw new CustomError('invalidEmail', 'User already registered');
  }
  const newUser = await User.create(data);
  return getToken(newUser);
};

const login = async ({ email, password }) => {
  const validEmail = await getByEmail(email);
  const validPassword = await getByPassword(password);
  if (!validEmail || !validPassword) {
    throw new CustomError('invalidData', 'Invalid fields');
  }
  return getToken(validEmail.dataValues);
};

const getAll = async ({ email }) => {
  const userEmail = await getByEmail(email);
  if (!userEmail) {
    throw new CustomError('invalidToken', 'Expired or invalid token');
  }
  return User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
};

module.exports = {
  create,
  login,
  getAll,
};
