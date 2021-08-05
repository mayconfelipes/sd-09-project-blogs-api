const { Category } = require('../models');

const createCategory = async (name) => {
  if (!name) throw new Error('"name" is required');
  const newCategory = await Category.create({ name });
  return newCategory;
};

const getAllCategories = async () => {
  const allCategories = await Category.findAll();
  return allCategories;
};

module.exports = {
  createCategory,
  getAllCategories,
};