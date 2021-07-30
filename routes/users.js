const express = require('express');
const usersController = require('../controllers/users');
const validateUser = require('../middlewares/validateUser');

const router = express.Router();

router.post('/', validateUser, usersController);

module.exports = router;
