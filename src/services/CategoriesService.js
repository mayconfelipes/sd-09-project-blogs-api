const { Categories } = require('../models');

const createCategory = async (name) => {
  const category = await Categories.create({ name })
    .then((newCategory) => newCategory.dataValues)
    .catch((error) => error);

  return category;
};

  module.exports = { 
  createCategory,
};