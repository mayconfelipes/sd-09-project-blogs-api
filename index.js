const express = require('express');

const app = express();

const userRouter = require('./routes/Users');

const errorMiddleware = require('./middlewares/error');

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use('/user', userRouter);

app.use(errorMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
