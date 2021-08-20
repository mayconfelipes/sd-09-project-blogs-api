const express = require('express');
const bodyParser = require('body-parser');

const error = require('./middlewares/error');
const routerUser = require('./routes/Users');

const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', routerUser);

app.use(error);

module.exports = app;
