const { Category } = require('../../models');
const validateCategory = require('../validateCategory');

module.exports = async (category) => {
  await validateCategory(category);

  const result = await Category.create(category);

  return { id: result.id, name: result.name };
};
