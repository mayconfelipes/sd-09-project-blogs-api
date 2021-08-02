const express = require('express');
const {
  UserController,
  LoginController,
  CategoryController,
} = require('./controllers');
const { SchemaLogin } = require('./schemas');

const app = express();
const PORT = 3000;
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', UserController);
app.use('/login', SchemaLogin, LoginController);
app.use('/categories', CategoryController);

app.listen(PORT, () => console.log('ouvindo porta 3000!'));