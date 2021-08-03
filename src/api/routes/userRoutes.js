const express = require('express');

const User = require('../../controllers/User');
const { validateDisplayName, validateEmail, validatePassword } = require('../../middlewares');

const router = express.Router();

router.post('/', [validateDisplayName, validateEmail, validatePassword, User.create]);

module.exports = router;