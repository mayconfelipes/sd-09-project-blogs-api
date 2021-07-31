const express = require('express');
const { users } = require('./controllers');

const {
  createToken,
  validateUser,
  validateLogin,
  validateToken,
  emailExists,
} = require('./middlewares');

const router = express.Router();

router.post('/user', validateUser, createToken, emailExists, users.create);
router.post('/login', validateLogin, createToken, emailExists, users.login);
router.get('/user', validateToken, users.getUsers);

module.exports = router;
