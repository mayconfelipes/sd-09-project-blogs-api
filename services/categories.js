const { Category } = require('../models');

const categorie = async (newCat) => Category.create(newCat);

const findAllCategories = async () => Category.findAll();

module.exports = { categorie, findAllCategories };