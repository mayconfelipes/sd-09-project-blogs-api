const { Category, BlogPost } = require('../models');
const { isCategoryValid, isPostDataValid, doesCategoriesExists } = require('./postsValidation');
const { validateToken } = require('./token');
const { getUserByData } = require('./usersServices');

const newCategory = async (data) => {
  const { category, token } = data;
  
  const invalidCategory = await isCategoryValid(category);
  if (invalidCategory) return invalidCategory;

  const validToken = await validateToken(token);
  if (validToken.status) return validToken;

  const createCategory = await Category.create(category);
  return createCategory;
};

const getCategories = async (token) => {
  const validToken = await validateToken(token);
  if (validToken.status) return validToken;

  const categories = await Category.findAll();
  return categories;
};

const newPost = async (data, token) => {
  const validToken = await validateToken(token);
  if (validToken.status) return validToken;

  const userId = await getUserByData('email', validToken).then((user) => user.dataValues.id);

  const invalidData = await isPostDataValid(data);
  if (invalidData) return { status: 400, message: (invalidData).message };

  const invalidCategories = await doesCategoriesExists(data.categoryIds);
  if (invalidCategories) return { status: 400, message: invalidCategories.message };

  const post = ({ ...data, userId });

  const create = await BlogPost.create(post);
  return create;
};

module.exports = {
  newCategory,
  getCategories,
  newPost,
};