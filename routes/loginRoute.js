const express = require('express');
const validateLogin = require('../middlewares/validateLogin');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.post('/login', validateLogin, loginController);

module.exports = router;
