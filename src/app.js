const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(bodyParser.json());

// Rotas
app.use(routes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// Error
app.use(errorMiddleware);

module.exports = app;
