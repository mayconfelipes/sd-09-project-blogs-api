const express = require('express');
const usersController = require('../controllers/users');
const validation = require('../middlewares/validateUser');
const tokenValidation = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/',
  validation.validateUser,
  validation.validateEmailUniqueness,
  usersController.createUser);

router.get('/', tokenValidation, usersController.getUsers);

module.exports = router;
