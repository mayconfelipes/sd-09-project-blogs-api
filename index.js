const express = require('express');
const bodyParse = require('body-parser');
const userRouter = require('./router/userRouter');

const app = express();
const PORT = 3000;

app.use(bodyParse.json());

app.listen(3000, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// rota inicial usuario
app.use('/user', userRouter);