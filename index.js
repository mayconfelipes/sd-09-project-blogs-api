const express = require('express');

const app = express();
app.use(express.json());

const errorMiddleware = require('./middlewares/errorMiddleware');
const usersRouter = require('./routes/usersRoute');
const loginRouter = require('./routes/loginRoute');
const categoryRoute = require('./routes/categoryRoute');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => response.send());

app.use(usersRouter);
app.use(loginRouter);
app.use(categoryRoute);

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));