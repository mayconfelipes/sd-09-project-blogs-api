const express = require('express');
const rescue = require('express-rescue');

const { userController } = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', rescue(userController.createUser));
router.get('/', middlewares.tokenValidation, rescue(userController.getAllUsers));

module.exports = router;
