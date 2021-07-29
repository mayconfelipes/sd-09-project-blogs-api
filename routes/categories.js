const express = require('express');

const app = express();

const controller = require('../controllers/categories');

const middleware = require('../middlewares');

app.post('/', middleware.getToken, controller.createCategorie);
app.get('/', middleware.getToken, controller.getAll);

module.exports = app;