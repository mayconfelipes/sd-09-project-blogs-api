const { BlogPosts, Category } = require('../models');
const error = require('./error');

const createPostServ = async (blogPostObj, userId) => {
  const { title, categoryIds, content } = blogPostObj;
  if (!title) throw error.requiredTitle;
  if (!categoryIds) throw error.requiredCategoryId;
  if (!content) throw error.requiredContent;
  const existCategoryId = await Category.findOne({ where: { id: categoryIds } });
  if (!existCategoryId) throw error.CategoryIdNotFound;
  const resultPost = await BlogPosts.create(title, content);
  const newResult = {
    id: resultPost.id,
    userId,
    title,
    content,
  };
  return newResult;
};

module.exports = {
  createPostServ,
};
