const router = require('express').Router();

const { categoriesController } = require('../controllers');
const middlewares = require('../middlewares');

// Create a category
router.post('/', middlewares.authentication, categoriesController.create);

module.exports = router;
