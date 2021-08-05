const { Categories } = require('../models');

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
  const category = await Categories.create({ name });
  return category;
};

const getAllCategories = async () => {
  const getCategory = await Categories.findAll({});
  return getCategory;
};

module.exports = {
  createCategory,
  getAllCategories,
};