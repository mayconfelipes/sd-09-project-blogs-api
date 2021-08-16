const categoryRouter = require('express').Router();

const Category = require('../controllers/category');

categoryRouter.post('/categories', Category.createCategory);
categoryRouter.get('/categories', Category.getCategory);

module.exports = categoryRouter;
