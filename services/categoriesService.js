const { Category } = require('../models');

const createCategory = async (name) => {
  const categoty = await Category.create({ name });
  return categoty.dataValues;
};

module.exports = {
  createCategory,
};