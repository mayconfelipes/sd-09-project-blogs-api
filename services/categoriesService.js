const { Category } = require('../models');

const createCategory = async (newCat) => {
  const cat = await Category.create(newCat);
  return cat;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  createCategory,
  getAllCategories,
};
