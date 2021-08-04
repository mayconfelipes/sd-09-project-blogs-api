const express = require('express');
const bodyParser = require('body-parser').json();

const Routes = require('./routes');
const { handleError } = require('../middlewares');

const app = express();

app.use(bodyParser);
module.exports = app;

app.use('/user', Routes.userRoutes);
app.use('/login', Routes.loginRoutes);

app.use('/categories', Routes.categoriesRoutes);

app.use(handleError);

app.get('/', (_request, response) => {
  response.send();
});
