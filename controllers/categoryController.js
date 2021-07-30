const rescue = require('express-rescue');
const services = require('../services');

const createCategory = rescue(async (req, res, _next) => {
  const newCategory = await services.createCategory(req.body);

  return res.status(201).json(newCategory);
});

const listAllCategories = rescue(async (req, res, _next) => {
  const categories = await services.listAllCategories();

  return res.status(200).json(categories);
});

module.exports = {
  createCategory,
  listAllCategories,
};
