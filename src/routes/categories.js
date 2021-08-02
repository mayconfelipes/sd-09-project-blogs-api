const express = require('express');
const catController = require('../controllers/categories');

const route = express.Router();

route.post('/', catController.createNew);
route.get('/', catController.getAll);

module.exports = route;