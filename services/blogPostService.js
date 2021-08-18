const joi = require('joi');
const { Op } = require('sequelize');
const { BlogPost, Category, User } = require('../models');
const { codes, objectError, objectResponse, messages } = require('../util/responseHandling');

const postValidator = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().required(),
});

const editFieldsValidator = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array(),
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
  const posts = await BlogPost.findAll({ 
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ], 
  });
  console.log(posts);
  return objectResponse(posts, codes.CODE_200);
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne(
    { 
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' }],
    },
  );
  if (!post) return objectError(messages.POST_NOT_EXIST, codes.CODE_404);
  return objectResponse(post, codes.CODE_200);
};

const editPost = async (post, userId, id) => {
  const { error } = editFieldsValidator.validate(post);
  if (error) return objectError(error.details[0].message, codes.CODE_400);
  console.log(post);
  if (post.categoryIds) return objectError(messages.CATEGORY_CANNOT_EDITED, codes.CODE_400);
  
  const update = await BlogPost.update(
    { ...post },
    { where: { id, userId } },
  );
  if (update.includes(0)) return objectError(messages.UNAUTHORIZED_USER, codes.CODE_401);
  
  const updatedPost = await BlogPost.findOne({ 
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' }],
    });
  return objectResponse(updatedPost, codes.CODE_200);
};

const deletePost = async (userId, id) => {
  const post = await BlogPost.findOne({ where: { id } });
  if (!post) return objectError(messages.POST_NOT_EXIST, codes.CODE_404);

  if (post.userId !== userId) return objectError(messages.UNAUTHORIZED_USER, codes.CODE_401);

  await BlogPost.destroy({ where: { id, userId } });
  return objectResponse(null, codes.CODE_204);
};

// https://sequelize.org/master/manual/model-querying-basics.html#applying-where-clauses
const getBySeach = async (query) => {
  const posts = await BlogPost.findAll({ 
    where: { 
      [Op.or]: [{ title: { [Op.substring]: query } }, { content: { [Op.substring]: query } }],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  console.log(posts);
  return objectResponse(posts, codes.CODE_200);
};

module.exports = { createPost, getAllPosts, getPostById, editPost, deletePost, getBySeach };