const { Categories } = require('../models');

const createNewCategorie = async (name) => {
  const newCategorie = await Categories.create({ name });
  return newCategorie.dataValues;
};

module.exports = {
  createNewCategorie,
};
