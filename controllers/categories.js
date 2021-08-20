const { Router } = require('express');
const rescue = require('express-rescue');

const categoriesServices = require('../services/categories');
const { validateToken } = require('../middlewares/token');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;

const categoriesControllers = new Router();

categoriesControllers.post('/', validateToken, rescue(async (req, res, _next) => {
  const category = req.body;
  if (!category.name || category.name === undefined) {
    const message = '"name" is required';
    return res.status(BAD_REQUEST_STATUS).json({ message });
  }
  const result = await categoriesServices.createCategory(category);
  return res.status(CREATED_STATUS).json(result);
}));

categoriesControllers.get('/', validateToken, rescue(async (_req, res, _next) => {
  const categories = await categoriesServices.getAllCategories();
  return res.status(OK_STATUS).json(categories);
}));

module.exports = categoriesControllers;
