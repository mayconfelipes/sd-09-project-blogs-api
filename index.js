const express = require('express');
const bodyParser = require('body-parser');

const routerUser = require('./src/routes/Users');

const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', routerUser);

app.use(({ status, message }, _req, res, _next) => {
  res.status(status).json({ message });
});

module.exports = app;
