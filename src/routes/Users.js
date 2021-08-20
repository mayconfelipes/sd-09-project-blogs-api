const express = require('express');

const validate = require('../middlewares/erro');

const userController = require('../controllers/Users');

const router = express.Router();

router.post('/', validate.body, validate.emailAlreadyExists, userController.registerUser);

module.exports = router;
