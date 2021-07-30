require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = process.env;

const app = express();

app.use(bodyParser.json());

const errorMiddleware = require('./middlewares/errorMiddleware');
const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const postRouter = require('./routes/postRouter');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);
app.use('/post', postRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
