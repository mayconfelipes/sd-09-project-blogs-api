const express = require('express');

const CategoriesRoutes = express.Router();
const validateToken = require('../middlwares/validateToken');
const CategoriesController = require('../controllers/categories');

CategoriesRoutes.post('/categories', validateToken, CategoriesController.cretaeCategory);
CategoriesRoutes.get('/categories', validateToken, CategoriesController.listCategories);

module.exports = CategoriesRoutes;