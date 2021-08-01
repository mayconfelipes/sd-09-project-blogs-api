const router = require('express').Router();
const { usersController } = require('../controllers');

// Create an user
router.post('/', usersController.create);

module.exports = router;
