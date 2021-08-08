const { Op } = require('sequelize');
const Categories = require('../../category/models/category');
const Models = require('../models/post');

const existsFields = ({ title, categoryIds, content }) => {
  switch (undefined) {
  case title:
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'nonexistentTitle' };
  case categoryIds:
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'nonexistentCategoryIds' };
  case content:
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'nonexistentContent' };
  default:
    return false;
  }
};

const validateCategories = async ({ categoryIds }) => {
  const categories = await Categories.getAll();

  const exists = categoryIds.every((catId) => categories.some(({ id }) => catId === id));

  if (!exists) {
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'nonexistentCategories' };
  }
};

const validatePost = async (post) => {
  const validPost = existsFields(post);
  if (validPost) return validPost;

  const validCategories = await validateCategories(post);
  if (validCategories) return validCategories;
};

const save = async (post, userId) => {
  const validPost = await validatePost(post);
  if (validPost) return validPost;
  
  try {
    const newPost = await Models.savePost(
      { ...post, userId, published: new Date(), updated: new Date() },
    );
    return newPost;
  } catch (error) {
    return { error: true, message: error };
  }
};

const all = async () => {
  const users = await Models.getAll();

  return users;
};

const byId = async (id) => {
  const post = await Models.getUserByField('id', id);

  if (!post) return { error: true, code: 'STATUS_NOT_FOUND', message: 'nonexistentPost' };

  return post;
};

const validateUpdate = (post) => {
  switch (true) {
  case !post.title:
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'nonexistentTitle' };
  case !post.content:
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'nonexistentContent' };
  case post.categoryIds !== undefined:
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'cannotCategory' };
  default:
    return false;
  }
};

const update = async (post, id, userId) => {
  const validFields = validateUpdate(post);

  if (validFields) return validFields;

  const userPost = await Models.getPostByPk(id);
  if (userPost.userId !== userId) {
    return { error: true, code: 'STATUS_UNAUTHORIZED', message: 'unauthorizedUser' };
  }

  const updatePost = await Models.update(post, id);
  if (!updatePost) return { error: true, code: 'STATUS_BAD_REQUEST', message: 'alreadyUpdate' };

  const newPost = await Models.getUserByField('id', id);
  return newPost;
};

const deletePost = async (id, userId) => {
  try {
    const userPost = await Models.getPostByPk(id);
    if (userPost.userId !== userId) {
      return { error: true, code: 'STATUS_UNAUTHORIZED', message: 'unauthorizedUser' };
    }
  } catch (error) {
    return { error: true, code: 'STATUS_NOT_FOUND', message: 'nonexistentPost' };
  }

  const deletedPost = await Models.deletePost(id);
  return deletedPost;
};

const byQuery = async (q) => {
  const filters = {};
  if (q) {
    filters[Op.or] = [
      {
        title: { [Op.like]: `%${q}%` },
      },
      {
        content: { [Op.like]: `%${q}%` },
      },
    ];
  }
  const post = await Models.getUserByQuery(filters);

  return post;
};

module.exports = {
  save,
  all,
  byId,
  update,
  deletePost,
  byQuery,
};
