const express = require('express');
const loginControler = require('../controllers/login');
const validateLogin = require('../middlewares/validateLogin');

const router = express.Router();

router.post('/', validateLogin, loginControler.login);

module.exports = router;
