const express = require('express');
const categoriesController = require('../controllers/categoriController');
const validateJWT = require('../middlewares/validateJWT');

const route = express.Router();

route.post('/categories', validateJWT,
  categoriesController.createCategories);

route.get('/categories', validateJWT,
categoriesController.getAll);

module.exports = route;
