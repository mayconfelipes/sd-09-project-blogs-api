const express = require('express');
const categories = require('../controllers/categories');

const route = express.Router();

route.post('/', categories.create);

module.exports = route;
