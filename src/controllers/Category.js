const { Router } = require('express');
const Auth = require('../middlewares/Auth');
const CategorySchema = require('../middlewares/CategorySchema');
const Category = require('../services/Category');

const CategoryRouter = Router();

const HTTP_CREATED = 201;

CategoryRouter.post('/', Auth, CategorySchema, async (req, res, next) => {
  try {
    const categoryData = req.body;
    const category = await Category.create(categoryData);
    res.status(HTTP_CREATED).json(category);
  } catch (err) {
    next(err);
  }
});

module.exports = { CategoryRouter };