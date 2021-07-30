const { Category } = require('../models');

const isCatNameValid = (name) => {
  if (!name) return '"name" is required';
};

const createCategory = async (name) => {
  const invalidCat = isCatNameValid(name);
  if (invalidCat) throw new Error(invalidCat);

  await Category.create({ name });

  const getCat = await Category.findOne({ where: { name } });

  return getCat;
};

const getAllCat = async () => {
  const findAllCat = await Category.findAll();
  return findAllCat;
};

module.exports = {
  createCategory,
  getAllCat,
};
