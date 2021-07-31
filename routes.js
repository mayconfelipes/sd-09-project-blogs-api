const express = require('express');
const { emailAlreadyExists } = require('./middlewares');
const { users } = require('./controllers');
const {
  createToken,
  validateUser,
} = require('./middlewares');

const router = express.Router();

router.post('/user', validateUser, createToken, emailAlreadyExists, users.create);

module.exports = router;
