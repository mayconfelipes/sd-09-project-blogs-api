const express = require('express');
const routes = require('./routes');
const middlewares = require('./middlewares');

const PORT = 3000;

const app = express();

app.use(express.json());

app.use('/user', routes.usersRouter);
app.use('/login', routes.userLogin);
app.use('/categories', routes.categoryRouter);
app.use('/post', routes.postRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(middlewares.error);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));