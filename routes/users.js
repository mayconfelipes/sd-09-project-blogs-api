const express = require('express');
const usersController = require('../controllers/users');
const validation = require('../middlewares/validateUser');

const router = express.Router();

router.post('/',
  validation.validateUser,
  validation.validateEmailUniqueness,
  usersController);

module.exports = router;
