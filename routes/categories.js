const express = require('express');
const rescue = require('express-rescue');

const categoryController = require('../controllers/categoryController');
const middlewares = require('../middlewares');

const route = express.Router();

route.post(
  '/',
  middlewares.tokenValidation,
  rescue(categoryController.createCategory),
);

module.exports = route;
