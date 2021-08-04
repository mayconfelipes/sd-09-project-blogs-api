const { Category } = require('../models');
const error = require('./error');

const createCategory = async ({ name }) => {
  if (!name) return error.requiredName;
  
  if (name) {
    const newCategory = await Category.create({ name });
    return newCategory;
  }
  };
module.exports = {
  createCategory,
}; 