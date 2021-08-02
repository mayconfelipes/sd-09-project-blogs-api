const express = require('express');
const catController = require('../controllers/categories');

const route = express.Router();

route.post('/', catController.createNew);

module.exports = route;