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

module.exports = {
  login,
  getAll,
  createUser,
};