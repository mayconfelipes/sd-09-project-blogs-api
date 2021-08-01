const express = require('express');

const { validateDisplayName, validateEmail } = require('../../middlewares');
const User = require('../../controllers/User');

const router = express.Router();

router.post('/', [validateDisplayName, validateEmail, User.create]);

module.exports = router;