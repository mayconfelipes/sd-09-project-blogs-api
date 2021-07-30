const express = require('express');
const bodyParser = require('body-parser');
const { userRoutes, categoryRoutes } = require('./api');

const { errorMiddleware } = require('./middlewares');
const controllers = require('./controllers');

const app = express();

app.use(bodyParser.json());
app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', controllers.login);
app.use('/user', userRoutes);
app.use('/categories', categoryRoutes);

app.use(errorMiddleware);
