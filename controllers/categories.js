const rescue = require('express-rescue');

const categoriesService = require('../services/categories');

const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_OK = 200;

const createCategory = rescue(async (req, res) => {
  const { name } = req.body;

  const result = await categoriesService.createCategory(name);

  return res.status(HTTP_STATUS_CREATED).json(result);
});

const getCategories = rescue(async (_req, res) => {
  const result = await categoriesService.getAll();

  return res.status(HTTP_STATUS_OK).json(result);
});

module.exports = {
  createCategory,
  getCategories,
};
