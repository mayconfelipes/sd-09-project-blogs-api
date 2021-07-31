const rescue = require('express-rescue');
const { categoriesService } = require('../services');

const { code: { CREATED, OK } } = require('../utils');

const createCategory = rescue(async (req, res) => {
  const { name } = req.body;
  const category = await categoriesService.createCategory(name);
  return res.status(CREATED).json(category);
});

const getCategories = rescue(async (req, res) => {
  const category = await categoriesService.getCategory();
  return res.status(OK).json(category);
});

module.exports = {
  createCategory,
  getCategories,
};
