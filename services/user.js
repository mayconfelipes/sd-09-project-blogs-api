const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET = 'TH!S!S@s3CR3t';

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const UserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const createErrorMsg = (code, msg) => ({
  code,
  msg,
});

const handleErrorJoi = (error) => {
  if (error !== undefined) {
    console.log(error.message);
    if (error.message.includes('password')) {
      console.log('entei');
      throw createErrorMsg('invalid_arguments', '"password" length must be 6 characters long');
    }
      throw createErrorMsg('invalid_arguments', error.message);
  }
};

const verifyIfEmailAndPassWord = (email, password) => {
  if (!email) {
    throw createErrorMsg('invalid_arguments', '"email" is required');
  }
  if (email === '') {
    throw createErrorMsg('invalid_arguments', '"email" is not allowed to be empty');
  }
  if (password === '') {
    throw createErrorMsg('invalid_arguments', '"password" is not allowed to be empty');
  }
  if (!password) {
    throw createErrorMsg('invalid_arguments', '"password" is required');
  }
};

const validateUser = async (user) => {
  const { email, displayName, password } = user;
  verifyIfEmailAndPassWord(email, password);
  const { error } = UserSchema.validate({ email, password, displayName });
  handleErrorJoi(error);
  const currentUSer = await User.findOne({ where: { email } });
  if (currentUSer) {
    throw createErrorMsg('user_exists', 'User already registered');
  }
};

const validateLogin = async (user) => {
  const { email, password } = user;
  verifyIfEmailAndPassWord(email, password);
  const { error } = LoginSchema.validate({ email, password });
  handleErrorJoi(error);
  if (error !== undefined) {
    handleErrorJoi(error);
  }
  const currentUSer = await User.findOne({ where: { email } });
  if (!currentUSer || currentUSer.password !== password) {
    throw createErrorMsg('user_not_exists', 'Invalid fields');
  }
};

const createUser = async (user) => {
  const { email, displayName, password, image } = user;
    await validateUser(user);
    await User.create({ email, displayName, password, image });
    const token = jwt.sign({ email, displayName }, SECRET, jwtConfig);
    return token;
};

const userLogin = async (user) => {
  const { email } = user;
  await validateLogin(user);
  const token = jwt.sign({ email }, SECRET, jwtConfig);
  return token;
};

const listUsers = async (id) => {
  if (id === undefined) {
    const users = await User.findAll();
    return users;
  }
  const user = await User.findByPk(id);
  if (!user) {
    throw createErrorMsg('user_not_exists', 'User does not exist');
  }
  return user;
};

module.exports = {
  createUser,
  userLogin,
  listUsers,
};