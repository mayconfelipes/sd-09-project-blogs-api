const { BlogPosts, Categories } = require('../models');

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
 const categoryExists = await Categories.findAll({ where: { id: categoryIds } });
 if (categoryExists.length === 0) throw categoryIdsNotFound;
};
const createPost = async (userId, title, content, categoryIds) => {
  validatePostInfo(title, content, categoryIds);
  await validateCategoryId(categoryIds);
  const post = await BlogPosts.create({ userId, title, content });
  return post.dataValues;
};

module.exports = {
  createPost,
};