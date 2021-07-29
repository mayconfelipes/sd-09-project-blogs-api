const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('../middlewares');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', routes.userRouter);

app.use('/login', routes.loginRouter);

app.use('/categories', routes.categoriesRouter);

app.use('/post', routes.postRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.use(middlewares.errorHandler);

module.exports = app;
