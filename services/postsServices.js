const { Category } = require('../models');
const { isCategoryValid } = require('./postsValidation');
const { validateToken } = require('./token');

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

module.exports = {
  newCategory,
  getCategories,
};