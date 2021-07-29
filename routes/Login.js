const express = require('express');
const LoginControllers = require('../controllers/Login');

const router = express.Router();

router.post('/', LoginControllers.login);

module.exports = router;