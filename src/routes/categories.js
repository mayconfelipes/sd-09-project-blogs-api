const express = require('express');
const categories = require('../controllers/categories');
const validate = require('../middlewares/validators');

const route = express.Router();

route.use(validate.token);
route.post('/', validate.category, categories.create);
route.get('/', categories.getAll);

module.exports = route;
