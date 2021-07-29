const express = require('express');
const bodyParser = require('body-parser');
const UserController = require('./controllers/user');
const ErrorMiddleware = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', UserController.createUser);

app.post('/login', UserController.userLogin);

app.get('/user', UserController.getAllUsers);

app.use(ErrorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
