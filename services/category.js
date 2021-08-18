const { Category } = require('../models');

const createCategory = async (data) => {
  const { name } = data;

  const category = await Category.create({ name });

  return category;
};

module.exports = {
  createCategory,
};
