const express = require('express');
const categorieService = require('../service/categorieService');
const tokenService = require('../service/tokenService');

const categorieRouter = express.Router();

categorieRouter.post('/', tokenService, categorieService.createCategorie);

categorieRouter.get('/', tokenService, categorieService.showAllCategories);

module.exports = categorieRouter;
