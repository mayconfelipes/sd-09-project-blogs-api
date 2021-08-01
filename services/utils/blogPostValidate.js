const { Category } = require('../../models');
const { BAD_REQUEST } = require('../../utils/httpStatus');

const isValidTitle = (title) => {
  if (!title) {
    const error = { type: BAD_REQUEST, message: '"title" is required' };
    throw error;
  }
  return true;
};

const isValidContent = (content) => {
  if (!content) {
    const error = { type: BAD_REQUEST, message: '"content" is required' };
    throw error;
  }
  return true;
};

const isValidcategoryIds = async (categoryIds) => {
  if (!categoryIds) {
    const error = { type: BAD_REQUEST, message: '"categoryIds" is required' };
    throw error;
  }
  
  const categoryExists = await Category.findAll({ where: { id: categoryIds } });
  if (!categoryExists.length) {
    const error = { type: BAD_REQUEST, message: '"categoryIds" not found' };
    throw error;
  }
  return true;
};

const isValidfields = async (blogPost) => {
  isValidTitle(blogPost.title);
  isValidContent(blogPost.content);
  await isValidcategoryIds(blogPost.categoryIds);
};

module.exports = {
  isValidfields,
};
