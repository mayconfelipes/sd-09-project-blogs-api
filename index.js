const express = require('express');
const { userRoutes } = require('./api');

const { errorMiddleware } = require('./middlewares');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoutes);

app.use(errorMiddleware);
