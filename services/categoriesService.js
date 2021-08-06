const { Category } = require('../models');

const nameRequired = {
  error: {
    code: 'NameRequired',
    message: '"name" is required',
} };

const verifyName = (name) => {
   if (!name) throw nameRequired;
};

const createCategory = async (name) => {
  verifyName(name);
  const category = await Category.create({ name });
  return category;
};

const getAllCategories = async () => {
  const getCategory = await Category.findAll({});
  return getCategory;
};

module.exports = {
  createCategory,
  getAllCategories,
};