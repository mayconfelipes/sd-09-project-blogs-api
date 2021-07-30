const express = require('express');
const mdwCategories = require('../middlewares/mdwCategories');
const mdwLogin = require('../middlewares/mdwLogin');

const categoryRouter = express.Router();

categoryRouter.get('/', mdwLogin.tokenValidator, mdwCategories.categoryFindAll);
categoryRouter.post('/', mdwLogin.tokenValidator, mdwCategories.categoryObjectValidator);

module.exports = categoryRouter;