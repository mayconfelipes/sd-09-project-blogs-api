const express = require('express');
const rescue = require('express-rescue');

// const validateToken = require('../api/auth/validateToken');
// const validateAdmin = require('../api/auth/validateAdmin');

const userController = require('../controllers/Users');

const router = express.Router();

router.post('/', rescue(userController.registerUser));

module.exports = router;
