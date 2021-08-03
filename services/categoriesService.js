const { Category } = require('../models');

const create = async (name) => {
  const newCategorie = await Category.create({ name });

  return newCategorie;
};

module.exports = {
  create,
};