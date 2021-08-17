const categoryRouter = require('express').Router();

const Category = require('../controllers/category');

categoryRouter.post('/categories', Category.create);
categoryRouter.get('/categories', Category.list);

module.exports = categoryRouter;
