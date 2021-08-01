const { Router } = require('express');
const { createCategory, getAllCategories } = require('../controllers/categoriesController');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const CategoryRoute = Router();

CategoryRoute.route('/categories')
  .post(tokenMiddleware, createCategory)
  .get(tokenMiddleware, getAllCategories);

module.exports = CategoryRoute;