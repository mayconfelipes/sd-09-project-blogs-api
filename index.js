const express = require('express');
require('dotenv/config');

const userRouter = require('./routes/userRoutes');
const errors = require('./middlewares/error');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRouter);

app.use(errors);
