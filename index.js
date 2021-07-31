const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/users');
const { sendErrorMessage } = require('./middwares/errors');
const { validateToken } = require('./middwares/validateToken');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', userController.create);

app.post('/login', userController.login);

app.get('/user', validateToken, userController.getAll);

app.get('/user/:id', validateToken, userController.getById);

app.use(sendErrorMessage);
