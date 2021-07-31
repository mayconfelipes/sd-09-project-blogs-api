const { Categories } = require('../models');

const createNewCategorie = async (name) => {
  const newCategorie = await Categories.create({ name });
  return newCategorie.dataValues;
};

const getAll = async () => {
  const categories = await Categories.findAll();
  return categories;
};

module.exports = {
  createNewCategorie,
  getAll,
};
