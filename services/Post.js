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

  if (categories.length === 0) return { err: { status: 400, message: '"categoryIds" not found' } };
};

const createPost = async (userId, title, categoryIds, content) => {
  const validTitle = validateTitle(title);
  const validContent = validateContent(content);
  const existsCategory = await validateIfCategoriesExists(categoryIds);
  const validCategory = validateCategory(categoryIds);
  if (validTitle) return validTitle.err;
  if (validContent) return validContent.err;
  if (existsCategory) return existsCategory.err;
  if (validCategory) return validCategory.err;
  const post = await BlogPost.create({ userId, title, categoryIds, content });
  return post;
};

module.exports = {
  createPost,
};
