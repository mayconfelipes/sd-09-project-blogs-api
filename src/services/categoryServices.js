const { Category } = require('../models');

const createCategory = async (categoryFields) => {
  const { name } = categoryFields;
  const category = await Category.create({ name });
  return category;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = { createCategory, getAllCategories };
