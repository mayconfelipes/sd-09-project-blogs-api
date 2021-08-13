const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const categoryRouter = require('./routes/category');
const postRouter = require('./routes/post');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use(userRouter);
app.use(loginRouter);
app.use(categoryRouter);
app.use(postRouter);

app.use((error, _request, response, _next) => {
  console.log(error);
  response.status(error).json({ message: error.message });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
