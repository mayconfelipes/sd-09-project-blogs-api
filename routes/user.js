const router = require('express').Router();
const { usersController } = require('../controllers');
const middlewares = require('../middlewares');

// Create an user
router.post('/', usersController.create);

// Get all users
router.get('/', middlewares.authentication, usersController.getAll);

module.exports = router;
