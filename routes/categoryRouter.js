const express = require('express');

const categoryRouter = express.Router();

const {
  registerCategoryController,
  getAllCategoriesController,
} = require('../controllers/categoryController');

const validateJWT = require('../middlewares/validateJWT');

categoryRouter.post('/', [
  validateJWT,
  registerCategoryController,
]);
categoryRouter.get('/', [
  validateJWT,
  getAllCategoriesController,
]);

module.exports = categoryRouter;
