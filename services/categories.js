const { Categories } = require('../models');

const categorie = async (newCat) => Categories.create(newCat);

const findAllCategories = async () => Categories.findAll();

module.exports = { categorie, findAllCategories };