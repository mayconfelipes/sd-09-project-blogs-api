const express = require('express');

const app = express();

const controller = require('../controllers/posts');

const middleware = require('../middlewares');

app.post('/', middleware.getToken, middleware.postValidation,
 middleware.categoryValidation, controller.createPost);

app.get('/', middleware.getToken, controller.getAll);

app.get('/:id', middleware.getToken, controller.getById);

module.exports = app;