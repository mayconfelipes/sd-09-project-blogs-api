const { Category } = require('../models');

const categoryVerification = ({ name }) => {
  const error = { status: 400, message: '"name" is required' };
  if (!name) throw error;
};

const createNewCategory = async (categoryInfos) => {
  categoryVerification(categoryInfos);
  const { name } = categoryInfos;
  const newCategory = await Category.create({
    name,
  });

  return newCategory;
};

const getAllCategories = async () => {
  const allUsers = await Category.findAll();

  return allUsers;
};

module.exports = {
  createNewCategory,
  categoryVerification,
  getAllCategories,
};
