const { Op } = require('sequelize');
const { Category } = require('../models');

const createCategory = async (name) => {
  const category = await Category.create({ name })
    .then((newCategory) => newCategory.dataValues)
    .catch((error) => error);

  return category;
};

const getCategoriesAll = async () => {
  const allCategories = await Category.findAll({});
  return allCategories;
}; 

const existsCategoriesIds = async (categoryIds) => {
  const categories = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  return categories.length === categoryIds.length;
};

  module.exports = { 
  createCategory,
  getCategoriesAll,
  existsCategoriesIds,
};