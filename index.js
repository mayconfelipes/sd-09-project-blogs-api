const express = require('express');
const userController = require('./controllers/user');
const userServices = require('./services/user');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.post('/user',
userServices.validateEmail,
userServices.validateName,
userServices.validatePassword,
userController.insertUser);

app.post('/login',
userServices.validateLogin,
userServices.validatePassword,
userController.logUser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
