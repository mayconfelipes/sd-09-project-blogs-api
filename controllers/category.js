const rescue = require('express-rescue');
const { Category } = require('../models');

const insertCategory = rescue(async (request, response) => {
  const { name } = request.body;
  const category = await Category.create({ name });
  console.log(`Imprimindo valor de category/controllers ${category}`);
  response.status(201).json(category);
});

module.exports = {
  insertCategory,
};