const { Categories } = require('../models');

const createCategory = async ({ name }) => {
  const result = await Categories.create({ name });
  return result;
};

const getAllCategories = async () => {
  const result = await Categories.findAll({});
  return result;
};

module.exports = {
  createCategory,
  getAllCategories,
};
