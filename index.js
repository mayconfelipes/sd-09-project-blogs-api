const express = require('express');
// const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const routes = require('./routes');
const middlewares = require('./middlewares');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', routes.user);

app.use('/login', routes.login);
app.use('/categories', routes.categories);

app.use(middlewares.error);
