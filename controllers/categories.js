const { Router } = require('express');

const { createCategory } = require('../services/categories');
const { validateToken } = require('../middlewares/token');

const CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;

const categoriesControllers = new Router();

categoriesControllers.post('/', validateToken, async (req, res, _next) => {
  const category = req.body;
  if (!category.name || category.name === undefined) {
    const message = '"name" is required';
    return res.status(BAD_REQUEST_STATUS).json({ message });
  }
  const result = await createCategory(category);
  return res.status(CREATED_STATUS).json(result);
});

module.exports = categoriesControllers;
