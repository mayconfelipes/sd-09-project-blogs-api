const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const Middlewares = require('./middlewares');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', routes.RoutesUsers);
app.use('/login', routes.RouteLogin);
app.use('/categories', routes.RoutesCategories);
app.use('/post', routes.RoutesPosts);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(Middlewares.errorMiddlewares);
