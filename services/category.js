const { Category } = require('../models');

const createCategory = (data) => Category.create(data);

const readCategories = () => Category.findAll();

module.exports = {
  createCategory,
  readCategories,
};
