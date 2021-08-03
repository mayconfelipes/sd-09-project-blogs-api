const joi = require('joi');
const { BlogPost, PostsCategory, User, Category } = require('../models');
const categoryServices = require('./categories');
const { messageError } = require('../middwares/errors');

const { 
  BAD_REQUEST_STATUS,
  INTERNAL_ERROR_STATUS,
  NOT_FOUND_STATUS } = require('../middwares/httpStatus');

const { 
  CATEGORY_NOT_FOUND,
  POST_NOT_CREATED,
  POSTCAT_NOT_CREATED, 
  POST_NOT_EXIST } = require('../middwares/errorMessages');

const postSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().items(joi.number().integer()).required(),
});

const validatePost = (post) => {
  const result = postSchema.validate(post);

  if (result.error) {
    throw messageError(BAD_REQUEST_STATUS, result.error.message);
  }
};

const create = async (post, userId) => {
  const { title, content, categoryIds } = post;

  validatePost(post);

  const category = await categoryServices.getById(categoryIds[0]);

  if (!category) {
    throw messageError(BAD_REQUEST_STATUS, CATEGORY_NOT_FOUND);
  }

  const newPost = await BlogPost.create({ title, content, userId });

  if (!newPost) {
    throw messageError(INTERNAL_ERROR_STATUS, POST_NOT_CREATED);
  }

  const postCategory = await PostsCategory.create({ 
    postId: newPost.id,
    categoryId: categoryIds[0] });

  if (!postCategory) {
    throw messageError(INTERNAL_ERROR_STATUS, POSTCAT_NOT_CREATED);
  }
 
  return newPost;
};

const getAll = async () => {
  const allPosts = await BlogPost.findAll(
    { include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }] },
    );

  return allPosts;
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id,
    { include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }] });

  if (!post) {
    throw messageError(NOT_FOUND_STATUS, POST_NOT_EXIST);
  }

  return post;
};

module.exports = {
  create,
  getAll,
  getById,
};