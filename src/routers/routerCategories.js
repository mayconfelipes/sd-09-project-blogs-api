const express = require('express');
const rescue = require('express-rescue');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', rescue(userController.login));

module.exports = router; 