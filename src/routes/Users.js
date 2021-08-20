const express = require('express');

const validate = require('../middlewares/validators');

const userController = require('../controllers/Users');

const router = express.Router();

router.post('/', validate.body, validate.emailAlreadyExists, userController.registerUser);

module.exports = router;
