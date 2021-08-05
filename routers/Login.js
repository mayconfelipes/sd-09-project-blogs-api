const express = require('express');
const singLogin = require('../Controllers/loginController');

const router = express.Router();

router.post('/', singLogin);

module.exports = router;