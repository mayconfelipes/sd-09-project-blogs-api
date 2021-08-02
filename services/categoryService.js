const { Categories } = require('../models');
const { categorySchema } = require('../schemas');

const postCategory = async (name) => {
  const categoryValidation = categorySchema.validate({ name });

  if (categoryValidation.error) return categoryValidation;

  const newCategory = await Categories.create({ name });

  return newCategory;
};

module.exports = {
  postCategory,
};
