const { BlogPost, Category, User } = require('../models');

const titleIsRequired = {
  error: {
    code: 'titleIsRequired',
    message: '"title" is required',
  },
};

const contentIsRequired = {
  error: {
    code: 'contentIsRequired',
    message: '"content" is required',
  },
};

const categoryIdsIsRequired = {
  error: {
    code: 'categoryIdsIsRequired',
    message: '"categoryIds" is required',
  },
};

const categoryIdsNotFound = {
  error: {
    code: 'categoryIdsNotFound',
    message: '"categoryIds" not found', 
  },
};

const validatePostInfo = (title, content, categoryIds) => {
 if (!title) throw titleIsRequired;
 if (!content) throw contentIsRequired;
 if (!categoryIds) throw categoryIdsIsRequired;
};

const validateCategoryId = async (categoryIds) => {
 const categoryExists = await Category.findAll({ where: { id: categoryIds } });
 if (categoryExists.length === 0) throw categoryIdsNotFound;
};
const createPost = async (userId, title, content, categoryIds) => {
  validatePostInfo(title, content, categoryIds);
  await validateCategoryId(categoryIds);
  const post = await BlogPost.create({ userId, title, content, categoryIds });
  console.log(post);
  delete post.dataValues.Categories;
  return post.dataValues;
};

const getAllPosts = async () => {
  const posts = await BlogPost
    .findAll({ include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }] });
  return posts;
};

module.exports = {
  createPost,
  getAllPosts,
};