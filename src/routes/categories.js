const express = require('express');
const categories = require('../controllers/categories');
const validate = require('../middlewares/validators');

const route = express.Router();

route.post('/', validate.token, validate.category, categories.create);
route.get('/', validate.token, categories.getAll);

module.exports = route;
