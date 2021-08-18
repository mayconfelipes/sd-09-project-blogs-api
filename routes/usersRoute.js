const express = require('express');
const rescue = require('express-rescue');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/', rescue(usersController.createUser));
router.get('/', rescue(usersController.listAllUsers));
router.get('/:id', rescue(usersController.userById));

module.exports = router;