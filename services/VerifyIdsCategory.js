const { Category } = require('../models');

const verifyIdsCategory = async (categoryIds) => {
  try {
    const categories = await Category.findAll();
    const ids = categories.map(({ id }) => id);
    const result = categoryIds.every((id) => ids.includes(id));
    return result;
  } catch (err) {
    return false;
  }
};

module.exports = {
  verifyIdsCategory,
};
