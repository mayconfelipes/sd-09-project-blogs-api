const express = require('express');
const rescue = require('express-rescue');
// rescue se comporta como um try catch para capturar os erros e passar pro middleware de erros genericos
const categoriesController = require('../controllers/categoriesController');
const validateToken = require('../middlewares/validateToken');
const validateCategoryName = require('../middlewares/validateCategoryName');

const categoriesRouter = express.Router();

categoriesRouter.post('/', [validateToken, validateCategoryName],
  rescue(categoriesController.createCategory));
categoriesRouter.get('/', validateToken, rescue(categoriesController.getAllcategories));

module.exports = categoriesRouter;