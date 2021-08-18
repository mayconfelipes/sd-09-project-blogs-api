const express = require('express');
const rescue = require('express-rescue');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/', rescue(usersController.createUser));
router.get('/', rescue(usersController.listAllUsers));

module.exports = router;