const express = require('express');
const { users } = require('./controllers');
const {
  createToken,
  validateUser,
  validateLogin,
  emailExists,
} = require('./middlewares');

const router = express.Router();

router.post('/user', validateUser, createToken, emailExists, users.create);
router.post('/login', validateLogin, createToken, emailExists, users.login);

module.exports = router;
