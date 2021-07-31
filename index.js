const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRouter = require('./routes/user/userRoute');
const loginRoute = require('./routes/login/loginRoute');
const categoryRoute = require('./routes/category/categoryRoute');
const postRoute = require('./routes/post/postRoute');

const PORT_NUMBER = 3000;
const PORT = process.env.PORT || PORT_NUMBER;

const HTTP_STATUS_INTERNAL_SERVER_ERROR = 422;

const app = express();

app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/login', loginRoute);
app.use('/categories', categoryRoute);
app.use('/post', postRoute);

app.use((err, _req, res, _next) => {
  if (err.err) return res.status(err.status).json({ message: err.err.message });
  res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: err });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
