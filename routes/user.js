const express = require('express');

const app = express();

const controller = require('../controllers/user');

const middleware = require('../middlewares');

app.post('/', middleware.validateDisplayName, middleware.validateEmail, middleware.validatePassword,
 middleware.erro, controller.createUser);

app.get('/', middleware.getToken, controller.getAll);

app.get('/:id', middleware.getToken, controller.getById);

module.exports = app;