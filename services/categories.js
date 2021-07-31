const { Category } = require('../models');

const create = async (categoryInfo) => {
  const createdCategory = Category.create(categoryInfo);

  return createdCategory.dataValues;
};

module.exports = {
  create,
};
