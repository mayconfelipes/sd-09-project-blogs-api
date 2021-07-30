const { Category } = require('../models');

const create = async ({ name }) => {
  const newCategory = await Category.create({ name });

  return newCategory.dataValues;
};

module.exports = {
  create,
};
