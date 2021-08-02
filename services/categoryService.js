const { Categories } = require('../models');
const { categorySchema } = require('../schemas');

const postCategory = async (name) => {
  const categoryValidation = categorySchema.validate({ name });

  if (categoryValidation.error) return categoryValidation;

  const newCategory = await Categories.create({ name });

  return newCategory;
};

const getAllCategories = async () => Categories.findAll();

module.exports = {
  postCategory,
  getAllCategories,
};
