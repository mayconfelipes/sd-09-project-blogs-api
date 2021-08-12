const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routers/userRouter');
const loginRouter = require('./routers/loginRouter');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use('/user', userRouter);
app.use('/login', loginRouter);

app.use((error, _req, res, _next) => {
  console.log(error);
  res.status(error.status).json({ message: error.message });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
