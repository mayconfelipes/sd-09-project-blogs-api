const { Category } = require('../models');

const createCategoryService = async (newCat) => {
  const ctg = await Category.create(newCat);

  return ctg;
};

module.exports = {
  createCategoryService,
};