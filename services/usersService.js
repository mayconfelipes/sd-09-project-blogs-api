const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET = 'mysupersecret';

const createToken = (tokenUser) => {
  // criando o token
  const token = jwt.sign(tokenUser, SECRET, {
    expiresIn: '3d',
    algorithm: 'HS256',
  });
  return token;
};

const createUsers = async ({ displayName, email, password, image }) => {
  const userCreate = await User.create({ displayName, email, password, image });

  const { password: pass, ...user } = userCreate.dataValues;
  // console.log(user);

  return createToken(user);
};

const loginUsers = async ({ email, password }) => {
  const loginUser = await User.findOne({ where: { email, password } });

  const { password: pass, ...user } = loginUser.dataValues;
  // console.log('serviceUser', user);
  return createToken(user);
};

const getAllUsersService = async () => {
  const getUser = await User.findAll();

  return getUser;
};

const getUserByIdService = async ({ id }) => {
  const getId = await User.findOne({ where: { id } });

  console.log('service', getId);
  return getId;
};

module.exports = {
  createUsers,
  loginUsers,
  getAllUsersService,
  getUserByIdService,
};