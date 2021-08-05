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

const createErrorMsg = (code, msg) => ({
  code,
  msg,
});

const validateUser = async (user) => {
  const { email, displayName, password } = user;
  const { error } = UserSchema.validate({ email, password, displayName });
  if (error !== undefined) throw createErrorMsg('invalid_arguments', error.message);
  const currentUSer = await User.findOne({ where: { email } });
  if (currentUSer) {
    throw createErrorMsg('user_exists', 'User already registered');
  }
};

const createUser = async (user) => {
  const { email, displayName, password, image } = user;
    await validateUser(user);
    await User.create({ email, displayName, password, image });
    const token = jwt.sign({ email, displayName }, SECRET, jwtConfig);
    return token;
  };

module.exports = {
  createUser,
};