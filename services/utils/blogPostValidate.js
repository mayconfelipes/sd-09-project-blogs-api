const { Category } = require('../../models');
const { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } = require('../../utils/httpStatus');

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

const isExistPost = (result) => {
  if (!result) {
    const error = { type: NOT_FOUND, message: 'Post does not exist' };
    throw error;
  }
  return true;
};

const isExistcategoryIds = (categoryIds) => {
  if (categoryIds) {
    const error = { type: BAD_REQUEST, message: 'Categories cannot be edited' };
    throw error;
  }
  return true;
};

const isValidUser = (userIdLogged, blogPost) => {
  const { dataValues: { userId } } = blogPost;
  if (userIdLogged !== userId) {
    const error = { type: UNAUTHORIZED, message: 'Unauthorized user' };
    throw error;
  }
};

const isValidfields = async (blogPost) => {
  isValidTitle(blogPost.title);
  isValidContent(blogPost.content);
  await isValidcategoryIds(blogPost.categoryIds);
};

const isvalidfieldsForUpdate = (postData) => {
  isExistcategoryIds(postData.categoryIds);
  isValidTitle(postData.title);
  isValidContent(postData.content);
};

module.exports = {
  isValidfields,
  isExistPost,
  isvalidfieldsForUpdate,
  isValidUser,
};
