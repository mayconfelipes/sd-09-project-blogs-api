const { BlogPost, Category } = require('../models');

const validateTitle = (title) => {
  if (!title) return { err: { status: 400, message: '"title" is required' } };
};

const validateContent = (content) => {
  if (!content) return { err: { status: 400, message: '"content" is required' } };
};

const validateCategory = (categoryIds) => {
  if (!categoryIds) return { err: { status: 400, message: '"categoryIds" is required' } };
};

const validateIfCategoriesExists = async (categoryIds) => {
  const categories = await Category.findAll({ where: { id: categoryIds } });

  if (!categories) return { err: { status: 400, message: '"categoryIds" not found' } };
};

const createPost = async (userId, title, categoryIds, content) => {
  const validTitle = validateTitle(title);
  const validContent = validateContent(content);
  const validCategory = validateCategory(categoryIds);
  const existsCategory = validateIfCategoriesExists(categoryIds);
  if (validTitle) return validTitle.err;
  if (validContent) return validContent.err;
  if (validCategory) return validCategory.err;
  if (await existsCategory) return existsCategory.err;
  const post = await BlogPost.create({ userId, title, categoryIds, content });
  return post;
};

module.exports = {
  createPost,
};
