const express = require('express');
const User = require('./controllers/UsersController');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', User.create);
app.post('/login', User.login);

app.use(errorMiddleware);
