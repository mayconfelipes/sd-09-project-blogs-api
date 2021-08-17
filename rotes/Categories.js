const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const Auth = require('../auth/tokenValidator');

const Router = express.Router();

Router.post('/categories', Auth.tokenValidator, CategoryController.createCategory);

module.exports = Router;