const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

app.use(routes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

module.exports = app;
