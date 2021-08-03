const express = require('express');
const User = require('../controllers/user');

const router = express.Router();

router.use('/user', User);

module.exports = router; 