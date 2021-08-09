const { Category } = require('../models');

const category = async (newCat) => Category.create(newCat);

const findAllCategories = async () => Category.findAll();

module.exports = { category, findAllCategories };