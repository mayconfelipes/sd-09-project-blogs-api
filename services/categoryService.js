const { Category } = require('../models');

const addCategory = async ({ name }) => {
  if (!name || name === '') {
    return {
      error: {
        code: 400,
        message: '"name" is required',
      },
    };
  }
  const createdCategory = await Category.create({ name });
  return createdCategory;
};

const getAllCategories = async () => {
  const categories = await Category.findAll() || null;
  return categories;
};

module.exports = {
  addCategory,
  getAllCategories,
};