const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User, Category } = require('../models');
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

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const blogPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
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
    const user = jwt.verify(token, secret);
    req.user = user;
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

const validateNewCategory = async (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  return next();
};

const validateIfCategoryExists = async (req, res, next) => {
  const { categoryIds } = req.body;
  console.log('CATEGORYIDS', categoryIds);
  const category = await Category.findAll({ where: { id: { [Op.or]: categoryIds } } });
  console.log('CATEGORY FINDALL', category);
  if (!category) res.status(400).json({ message: 'categoryIds not found' });
  return next();
};

const validateBlogPostData = async (req, res, next) => {
  const { error } = blogPostSchema.validate(req.body);
  if (error) res.status(400).json({ message: error.message });
  return next();
};

module.exports = {
  validateUser,
  hasDuplicatedEmail,
  validateLogin,
  userIsRegistered,
  validateToken,
  validateNewCategory,
  validateIfCategoryExists,
  validateBlogPostData,
};
