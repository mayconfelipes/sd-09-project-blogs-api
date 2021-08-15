const express = require('express');
const { tokenValidation } = require('../middlewares/index');
const { postCategory, getCategories } = require('../controllers/category');

const categoryRouter = express.Router();

categoryRouter.post('/categories', tokenValidation, postCategory);
categoryRouter.get('/categories', tokenValidation, getCategories);

module.exports = { categoryRouter };
