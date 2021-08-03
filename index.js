const express = require('express');
const bodyParser = require('body-parser').json();
const controllers = require('./controllers');
const validateJWT = require('./auth/validateJWT');

const app = express();

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', controllers.users.signIn);
app.post('/login', controllers.users.login);
app.get('/user', validateJWT, controllers.users.getAll);
app.get('/user/:id', validateJWT, controllers.users.getById);
app.post('/categories', validateJWT, controllers.categories.create);
app.get('/categories', validateJWT, controllers.categories.getAll);

app.listen(3000, () => console.log('ouvindo porta 3000!'));