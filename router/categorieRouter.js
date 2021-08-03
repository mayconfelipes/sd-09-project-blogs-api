const express = require('express');
const categorieService = require('../service/categorieService');
const tokenService = require('../service/tokenService');

const categoriRouter = express.Router();

categoriRouter.post('/', tokenService, categorieService.createCategorie);

categoriRouter.get('/', tokenService, categorieService.showAllCategories);

module.exports = categoriRouter;
