const { Categories } = require('../../../models');

const saveCategory = async (category) => {
  try {
    const newCategory = await Categories.create(category);
    return newCategory;
  } catch (error) {
    return { error: true, code: 500, message: error };
  }
};

const getAll = async () => {
  try {
    const categories = await Categories.findAll();
    return categories;
  } catch (error) {
    return { error: true, code: 500, message: error };
  }
};

module.exports = {
  saveCategory,
  getAll,
};
