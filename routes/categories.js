const express = require('express');
const controllers = require('../controllers/categories');
const tokenValidate = require('../middlewares/tokenValidate');

const categories = express.Router();

categories.post('/', tokenValidate, controllers.newCategory);
categories.get('/', tokenValidate, controllers.getCategories);

module.exports = categories;
