const express = require('express');
const rescue = require('express-rescue');

const { createCategoryController } = require('../controllers/categoriesController');
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');

const categoriesRouter = express.Router();

categoriesRouter.post(
  '/',
  [validateToken, validateName],
  rescue(createCategoryController),
);

module.exports = categoriesRouter;
