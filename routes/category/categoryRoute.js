const express = require('express');
const rescue = require('express-rescue');
const validateToken = require('../middlewares/validateToken');

const categoryController = require('./categoryController');

const categoryRoute = express.Router();

categoryRoute.post('/', rescue(validateToken), rescue(categoryController.createCategory));
categoryRoute.get('/', rescue(validateToken), rescue(categoryController.allCategories));

module.exports = categoryRoute;
