const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  password: Joi.string().length(6).required(),
  email: Joi.string().email().required(),
  image: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const categorieSchema = Joi.object({
  name: Joi.string().required(),
});

const validateUser = async (req, res, next) => {
  const userInfo = req.body;
  const { error } = userSchema.validate(userInfo);
  if (error) return res.status(400).json({ message: error.message });
  return next();
};

const hasDuplicatedEmail = async (req, res, next) => {
  const { email } = req.body;
  const findUserByEmail = await User.findOne({ where: { email } });
  if (findUserByEmail) return res.status(409).json({ message: 'User already registered' });
  return next();
};

const userIsRegistered = async (req, res, next) => {
  const { email } = req.body;
  const findUserByEmail = await User.findOne({ where: { email } });
  if (!findUserByEmail) return res.status(400).json({ message: 'Invalid fields' });
  return next();
};

const validateLogin = async (req, res, next) => {
  const loginInfo = req.body;
  const { error } = loginSchema.validate(loginInfo);
  if (error) return res.status(400).json({ message: error.message });
  return next();
};

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, secret);
    return next();
  } catch (err) {
    if (err.message === 'jwt must be provided') { 
      return res.status(401).json({ message: 'Token not found' });
    }
    if (err.message === 'jwt malformed') { 
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  }
};

const validateNewCategorie = async (req, res, next) => {
  const { error } = categorieSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  return next();
};

module.exports = {
  validateUser,
  hasDuplicatedEmail,
  validateLogin,
  userIsRegistered,
  validateToken,
  validateNewCategorie,
};
