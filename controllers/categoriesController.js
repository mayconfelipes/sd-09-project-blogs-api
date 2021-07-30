const express = require('express');
const mdwCategories = require('../middlewares/mdwCategories');
const mdwLogin = require('../middlewares/mdwLogin');

const categoryRouter = express.Router();

categoryRouter.post('/', mdwLogin.tokenValidator, mdwCategories.categoryObjectValidator);

module.exports = categoryRouter;