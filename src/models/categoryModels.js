const { Category } = require('../../models');

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

module.exports = {
  postCategory,
};
