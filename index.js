const express = require('express');
const bodyParser = require('body-parser');
const userControllers = require('./controllers/users');
const categoryControllers = require('./controllers/categories');
const { sendErrorMessage } = require('./middwares/errors');
const { validateToken } = require('./middwares/validateToken');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', userControllers.create);

app.post('/login', userControllers.login);

app.get('/user', validateToken, userControllers.getAll);

app.get('/user/:id', validateToken, userControllers.getById);

app.post('/categories', validateToken, categoryControllers.create);

app.get('/categories', validateToken, categoryControllers.getAll);

app.use(sendErrorMessage);
