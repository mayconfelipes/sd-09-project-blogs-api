const express = require('express');
// const rescue = require('express-rescue');
// rescue se comporta como um try catch para capturar os erros e passar pro middleware de erros genericos
// const categoriesController = require('../controllers/categoriesController');

const categoriesRouter = express.Router();

// categoriesRouter.post('/', rescue(categoriesController.createcategory));
// categoriesRouter.get('/', rescue(categoriesController.getAllcategories));

module.exports = categoriesRouter;