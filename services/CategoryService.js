const { Category } = require('../models/index.js');

const isValidName = (name) => {
  if (!name) {
      return '"name" is required';
  }
  return undefined;
};

const addCategory = async (name) => {
  const isNotValidName = isValidName(name);
  if (isNotValidName) {
      throw new Error(isNotValidName);
  }

  await Category.create({ name });
  const category = await Category.findOne({ where: { name } });
  return category;
};

const getAllCategories = async () => {
  const result = await Category.findAll();
  return result;
};

module.exports = {
  addCategory,
  getAllCategories,
};