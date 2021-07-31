const { Category } = require('../models');

const create = async (categoryInfo) => {
  const createdCategory = await Category.create(categoryInfo);

  return createdCategory.dataValues;
};

const getAll = async () => {
  const categoriesList = await Category.findAll();

  return categoriesList;
};

module.exports = {
  create,
  getAll,
};
