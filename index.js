const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const controllers = require('./controllers');
const middlewares = require('./middlewares');

const app = express();

const PORT = 3000;

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['authorization'],
  }),
);

app.use(bodyParser.json());

app.use('/login', controllers.login);

app.use('/user', controllers.user);

app.use('/categories', controllers.category);

app.use(middlewares.error);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
