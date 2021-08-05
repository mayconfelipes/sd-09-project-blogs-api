const express = require('express');
const singLogin = require('../Controllers/loginController');

const router = express.Router();

router.get('/', singLogin);

module.exports = router;