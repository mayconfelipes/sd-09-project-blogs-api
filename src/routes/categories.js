const express = require('express');
const categories = require('../controllers/categories');
const { token } = require('../services/users');

const route = express.Router();

route.post('/', token, categories.create);
route.get('/', token, categories.getAll);

module.exports = route;
