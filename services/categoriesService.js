const { Category } = require('../models');

const createCategory = async (newCat) => {
  // const { name } = newCat;
  // if (!name) throw NAME_IS_REQUIRED
  const cat = await Category.create(newCat);
  return cat;
};

module.exports = {
  createCategory,
}