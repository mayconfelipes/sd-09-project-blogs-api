const express = require('express');

const { validateDisplayName, validateEmail, validatePassword } = require('../../middlewares');
const User = require('../../controllers/User');

const router = express.Router();

router.post('/', [validateDisplayName, validateEmail, validatePassword, User.create]);

module.exports = router;