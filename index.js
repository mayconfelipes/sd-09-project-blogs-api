const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routers/userRouter');
const loginRouter = require('./routers/loginRouter');
const categoriesRouter = require('./routers/categoriesRouter');
// const postRouter = require('./routers/postRouter');

const app = express();
app.use(bodyParser.json());
// converte o corpo da requisição de json p/ javascript

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoriesRouter);
// app.use('/post', postRouter);

app.use((error, _req, res, _next) => {
  console.log(error);
  res.status(error.status).json({ message: error.message });
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
