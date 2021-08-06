const { Categories } = require('../models');

const createErrorMsg = (code, msg) => ({
  code,
  msg,
});

const validateName = (name) => {
  if (!name) {
    throw createErrorMsg('invalid_arguments', '"name" is required');
  }
};

const createCategory = async (name) => {
  validateName(name);
  const newCategory = await Categories.create({ name });
  return newCategory;
};

const listCategories = async () => {
  const categories = await Categories.findAll();
  return categories;
};
module.exports = {
  createCategory,
  listCategories,
};