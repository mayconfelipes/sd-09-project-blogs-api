const { Categories } = require('../models');

const categorie = async (newCat) => Categories.create(newCat);

module.exports = { categorie };