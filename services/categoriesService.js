const { Category } = require('../models');

const createCategory = async (category) => {
  console.log('chegou aqui');
  const checkCategory = await Category.findOne({ where: { ...category } });
  if (checkCategory) {
    const err = new Error('Category already registered');
    err.status = 409;
    throw err;
  }
  const { dataValues: newCategory } = await Category.create(category);
  return newCategory;
};

const getCategories = async () => {
  const categoriesList = await Category.findAll();
  return categoriesList.map((category) => category.dataValues);
};

module.exports = {
  createCategory,
  getCategories,
};
