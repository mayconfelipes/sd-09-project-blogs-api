const router = require('express').Router();
const { usersController } = require('../controllers');
const middlewares = require('../middlewares');

// Create an user
router.post('/', usersController.create);

// Get all users
router.get('/', middlewares.authentication, usersController.getAll);

// Get user by ID
router.get('/:id', middlewares.authentication, usersController.getById);

// Delete own user
router.delete('/me', middlewares.authentication, usersController.deleteOwnUser);

module.exports = router;
