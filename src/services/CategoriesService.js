const { Categories } = require('../models');

const createCategory = async (name) => {
  const category = await Categories.create({ name })
    .then((newCategory) => newCategory.dataValues)
    .catch((error) => error);

  return category;
};

const getCategoriesAll = async () => 
  Categories.findAll({}, { attributes: { exclude: ['createAt', 'updateAt'] } });

  module.exports = { 
  createCategory,
  getCategoriesAll,
};