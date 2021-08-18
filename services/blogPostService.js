const joi = require('joi');
const { BlogPost, Category } = require('../models');
const { codes, objectError, objectResponse, messages } = require('../util/responseHandling');

const postValidator = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().required(),
});

const categoriesValidator = async (categoryIds) => {
  const categories = await Category.findAll({ where: { id: categoryIds } });
  if (categories.length !== categoryIds.length) {
    return objectError(messages.CATEGORY_NOT_FOUND, codes.CODE_400);
  }
  return {};
};

const createPost = async (title, content, categoryIds, userId) => {
  const { error } = postValidator.validate({ title, content, categoryIds });
  if (error) return objectError(error.details[0].message, codes.CODE_400);

  const categoriesExist = await categoriesValidator(categoryIds);
  if (categoriesExist.response) return categoriesExist;

  const newPost = await BlogPost.create({ userId, title, content });
  newPost.id = newPost.null;
  return objectResponse(newPost, codes.CODE_201);
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll();
  return objectResponse(posts, codes.CODE_200);
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne(id);
  if (!post) return objectError(messages.POST_NOT_EXIST, codes.CODE_404);
  return objectResponse(post, codes.CODE_200);
};

module.exports = { createPost, getAllPosts, getPostById };