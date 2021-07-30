const express = require('express');
const rescue = require('express-rescue');

const { loginContoller } = require('../controllers');

const router = express.Router();

router.post('/', rescue(loginContoller));

module.exports = router;
