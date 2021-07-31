const categoryModel = require('./categoryModel');
const { validateNewCategory } = require('../../util/validations');

const createCategory = async (category) => {
  validateNewCategory(category);
  const result = await categoryModel.createCategory(category);
  return result;
};

const allCategories = async () => {
  const result = await categoryModel.allCategories();
  return result;
};

module.exports = {
  createCategory,
  allCategories,
};
