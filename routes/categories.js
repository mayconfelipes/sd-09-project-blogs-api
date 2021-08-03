const router = require('express').Router();

const { categoriesController } = require('../controllers');
const middlewares = require('../middlewares');

// Create a category
router.post('/', middlewares.authentication, categoriesController.create);

// Get all categories
router.get('/', middlewares.authentication, categoriesController.getAll);

module.exports = router;
