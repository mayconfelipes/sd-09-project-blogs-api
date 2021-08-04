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
  if (validTitle) return validTitle.err;
  const validContent = validateContent(content);
  if (validContent) return validContent.err;
  const validCategory = validateCategory(categoryIds);
  if (validCategory) return validCategory.err;
  const existsCategory = await validateIfCategoriesExists(categoryIds);
  if (existsCategory) return existsCategory.err;

  const post = await BlogPost.create({ userId, title, categoryIds, content });
  return post;
};

module.exports = {
  createPost,
};
// teste