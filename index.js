require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const middlewares = require('./middlewares');

const { PORT } = process.env;

const app = express();

app.use(express.json());

app.use('/user', routes.usersRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(middlewares.error);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
