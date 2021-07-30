const { Categorie } = require('../models');

const createCategorie = async (name) => Categorie.create({ name });

const getCategories = async () => Categorie.findAll();

module.exports = {
  createCategorie,
  getCategories,
};
