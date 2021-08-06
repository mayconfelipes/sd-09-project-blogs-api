const express = require('express');
const rescue = require('express-rescue');
const { validateLogin } = require('../middlewares/validateLogin');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.post('/login', validateLogin, rescue(loginController));

module.exports = router;