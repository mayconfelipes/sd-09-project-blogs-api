const rescue = require('express-rescue');
const { Category } = require('../models');
const categoryService = require('../services/category');

const insertCategory = rescue(async (request, response) => {
  const { name } = request.body;
  const category = await Category.create({ name });
  // console.log(`Imprimindo valor de category/controllers ${category}`);
  response.status(201).json(category);
});

const listCategories = rescue(async (request, response) => {
  const categories = await categoryService.listCategories();
  // console.log(`Imprimindo o valor de categories/controllers ${categories}`);
  return response.status(200).json(categories);
});

module.exports = {
  insertCategory,
  listCategories,
};