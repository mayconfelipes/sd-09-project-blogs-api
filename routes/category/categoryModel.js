const { Category } = require('../../models');

const createCategory = async (category) => {
  try {
    const result = await Category.create({ ...category });
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const allCategories = async () => {
  try {
    const result = await Category.findAll();
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCategory,
  allCategories,
};
