const express = require('express');
const bodyParser = require('body-parser').json();

const { createUser, getUsers } = require('./controllers/user');
const { login } = require('./controllers/login');
const error = require('./middlewares/error');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use(bodyParser);
app.use(error);

app.post('/user', createUser);
app.get('/user', getUsers);

app.post('/login', login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
