const express = require('express');

const User = require('../controllers/userController');
const { validateUser } = require('../middlewares/validateCreateUser');

const router = express.Router();

router.post('/', validateUser, User.create);

module.exports = router;