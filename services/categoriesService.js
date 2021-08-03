const { Category } = require('../models');

const create = async (name) => {
  const newCategorie = await Category.create({ name });

  return newCategorie;
};

const getAll = async () => {
    const categories = await Category.findAll();
    return categories;
  };

module.exports = {
  create,
  getAll,
};