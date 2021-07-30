const { Categorie } = require('../models');

const createCategorie = async (name) => Categorie.create({ name });

module.exports = {
  createCategorie,
};
