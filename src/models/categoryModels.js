const { Category } = require('../sequelize/models');

const getCategoryByName = async (name) => {
  const myCategory = await Category.findOne({ where: { name } });

  return myCategory;
};

const postCategory = async (name) => {
  const result = await getCategoryByName(name);

  if (result) return;

  const createdCategory = await Category.create({ name });

  return createdCategory;
};

const getAllCategories = async () => {
  const result = await Category.findAll();

  return result;
};

module.exports = {
  postCategory,
  getAllCategories,
};
