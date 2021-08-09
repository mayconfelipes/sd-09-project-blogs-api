const express = require('express');
const bodyParser = require('body-parser').json();

const router = require('./routes/router');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(bodyParser);

app.use(router);

app.use(errorHandler);

module.exports = app;
