const { Category } = require('../models');

const createCategoryService = async (newCat) => {
  const ctg = await Category.create(newCat);

  return ctg;
};

const getAllCategoriesService = async () => {
  const ctg = await Category.findAll();

  return ctg;
};

module.exports = {
  createCategoryService,
  getAllCategoriesService,
};