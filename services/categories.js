const { Category } = require('../models');

const createCategory = async (name) => {
  const categoty = await Category.create({ name });
  return categoty.dataValues;
};

const getCategory = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  createCategory,
  getCategory,
};