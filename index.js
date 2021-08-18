const express = require('express');
const userController = require('./controllers/user');
const userServices = require('./services/user');
const { validate } = require('./services/validate');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.post('/user',
userServices.validateEmail,
userServices.validateName,
userServices.validatePassword,
userController.insertUser);

app.post('/login',
userServices.validateLoginEmail,
userServices.validateLoginPassword,
userController.logUser);

app.get('/user',
validate,
userController.listAllUsers);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use((error, _req, res, _next) => {
  console.log(error);
  res.status(error).json({ message: error.message });
});
