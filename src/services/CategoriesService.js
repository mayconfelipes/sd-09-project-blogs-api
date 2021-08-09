const { Op } = require('sequelize');
const { Categories } = require('../models');

const createCategory = async (name) => {
  const category = await Categories.create({ name })
    .then((newCategory) => newCategory.dataValues)
    .catch((error) => error);

  return category;
};

const getCategoriesAll = async () => {
  const allCategories = await Categories.findAll({},
    { attributes: { exclude: ['createAt', 'updateAt'] } });
  return allCategories;
}; 

const existsCategoriesIds = async (categoryIds) => {
  const categories = await Categories.findAll({ where: { id: { [Op.in]: categoryIds } } });
  return categories.length === categoryIds.length;
};

  module.exports = { 
  createCategory,
  getCategoriesAll,
  existsCategoriesIds,
};