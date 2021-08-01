const { Category } = require('../models');

const validateCategory = (category) => {
  const error = { status: 400, message: '"name" is required' };
  if (!category) throw error;
};

const create = async (category) => {
  validateCategory(category);
  const newCategory = await Category.create({ name: category });
  return newCategory.dataValues;
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  create,
  getAll,
};