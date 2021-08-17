const express = require('express');
const rescue = require('express-rescue');

const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const {
  createCategoryController,
  getAllcategoriesController,
} = require('../controllers/categoriesController');

const categoriesRouter = express.Router();

categoriesRouter.post(
  '/',
  [validateToken, validateName],
  rescue(createCategoryController),
);

categoriesRouter.get('/', validateToken, rescue(getAllcategoriesController));

module.exports = categoriesRouter;
