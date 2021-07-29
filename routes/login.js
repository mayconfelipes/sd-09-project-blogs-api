const express = require('express');

const app = express();

const { login } = require('../controllers/loginController');

const middleware = require('../middlewares');

app.post('/', middleware.validateLogin, login);

module.exports = app;