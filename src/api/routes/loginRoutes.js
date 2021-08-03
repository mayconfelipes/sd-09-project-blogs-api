const express = require('express');

const Login = require('../../controllers/Login');
const { validateLoginFields, validateEmail, validatePassword } = require('../../middlewares');

const router = express.Router();

router.post('/', [validateLoginFields, validateEmail, validatePassword, Login.log]);

module.exports = router;