const { Categories } = require('../models');
const { categorySchema } = require('../schemas');

const postCategory = async (name) => {
  const categoryValidation = categorySchema.validate({ name });

  if (categoryValidation.error) return categoryValidation;

  const newCategory = await Categories.create({ name });

  return newCategory;
};

const getCategoryByPk = async (id) => Categories.findByPk(id);
const getCategoriesByPk = async (id) => Categories.findAll({ where: { id } });
const getAllCategories = async () => Categories.findAll();

module.exports = {
  postCategory,
  getAllCategories,
  getCategoryByPk,
  getCategoriesByPk,
};
