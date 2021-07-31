const jwt = require('jsonwebtoken');
const { User } = require('../models');

const createUser = async ({ displayName, password, email, image }) => {
  const userAlreadyExists = await User.findOne({ where: { email } });

  const errorMessage = {
    error: {
      code: 'userAlreadyRegistred',
      message: 'User already registered',
    },
  };

  if (userAlreadyExists) return errorMessage;

  const newUser = await User.create({ displayName, email, password, image });
  delete newUser.dataValues.password;
  return newUser;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });

  const errorMessage = {
    error: {
      code: 'userNotFound',
      message: 'Invalid fields',
    },
  };

  if (!user) return errorMessage;

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const { id } = user.dataValues;

  const token = jwt.sign({ id }, process.env.JWT_SECRET, jwtConfig);
  return { token };
};

const getAll = async () => User.findAll();

const getById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

  const errorMessage = {
    error: {
      code: 'userNotFound',
      message: 'User does not exist',
    },
  };

  if (!user) return errorMessage;

  return user;
};

module.exports = {
  login,
  getAll,
  getById,
  createUser,
};