const express = require('express');
const loginController = require('../Controllers/loginController');

const router = express.Router();

router.post('/', loginController);

module.exports = router;