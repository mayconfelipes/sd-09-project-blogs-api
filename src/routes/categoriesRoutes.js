const express = require('express');
const categorieController = require('../controllers/categoriesController');
const validate = require('../middlewares/validators');

const route = express.Router();

route.post('/', validate.categorie, validate.token, categorieController.createCategorie);
route.get('/', validate.token, categorieController.getAllCategories);

module.exports = route;
