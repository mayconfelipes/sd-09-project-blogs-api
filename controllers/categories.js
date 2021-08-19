const rescue = require('express-rescue');
const { Category } = require('../models');

const insertCategory = rescue(async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name });
  res.status(201).json(category);
});

const listAllCategories = rescue(async (req, res) => {
  const categories = await Category.findAll();
  return res.status(200).json(categories);
});

module.exports = {
  insertCategory,
  listAllCategories,
}; 