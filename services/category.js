const { Category } = require('../models');

const serviceRegisterCategory = async (category) => {
  const { name } = category;
  await Category.create({ name });
  const categorySearch = await Category.findOne({ where: { name } });
  return categorySearch;
};

const serviceGetAll = async () => {
  const getCategories = await Category.findAll({ raw: true });
  return (getCategories);
};

module.exports = {
  serviceRegisterCategory,
  serviceGetAll,
};