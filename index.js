const express = require('express');
const bodyParser = require('body-parser').json();

const { createUser, getUsers, getUserById } = require('./controllers/user');
const { login } = require('./controllers/login');
const { createCategorie, getCategories } = require('./controllers/categories');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use(bodyParser);

app.post('/user', createUser);
app.get('/user', getUsers);
app.get('/user/:id', getUserById);

app.get('/categories', getCategories);
app.post('/categories', createCategorie);

app.post('/login', login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
