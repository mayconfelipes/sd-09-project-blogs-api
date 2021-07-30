const { Category } = require('../models');

const create = async ({ name }) => {
  const newCategory = await Category.create({ name });

  return newCategory.dataValues;
};

const getAll = async () => {
  const getAllCategories = await Category.findAll();

  return getAllCategories;
};

module.exports = {
  create,
  getAll,
};
