const Joi = require('joi');
const { code } = require('../helpers/messages');
const { Category, BlogPost } = require('../models');

const validatePost = (data) =>
Joi.object({
    title: Joi.string().required().messages({
      'any.required': '"title" is required',
    }),
    content: Joi.string().required().messages({
      'any.required': '"content" is required',
    }),
    categoryIds: Joi.array().required().messages({
      'any.required': '"categoryIds" is required',
    }),
  }).validate(data);

const validateCategory = async (data) => {
  const allCategories = await Category.count({ where: { id: data.categoryIds } });
  if (allCategories !== 0) return true;  
};

const validateExistPost = async (postId) => {
  const posts = await BlogPost.count({ where: { id: postId } });
  if (posts !== 0) return true;
};

const validateFormPost = async (req, res, next) => {
  const data = req.body;
  const { error } = validatePost(data);
  try {
    if (error) {
      const categoryInfoResponse = { code: 400, message: error.details[0].message };
      throw categoryInfoResponse;
    }
    next();
  } catch (err) {
    return res.status(code.BAD_REQUEST).json({ message: err.message });
  }
};

const validatePostUpdate = (data) => {
  if (data.categoryIds) {
    const categoryError = { code: 400, message: 'Categories cannot be edited' };
    throw categoryError;
  }
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }).validate(data);
  if (error) {
    const postInfoResponse = { code: 400, message: error.message };
    throw postInfoResponse;
  }
};

module.exports = {
  validateFormPost,
  validateCategory,
  validateExistPost,
  validatePostUpdate,
};