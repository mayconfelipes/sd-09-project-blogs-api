const express = require('express');
const { UserController, LoginController } = require('./controllers');
const { SchemaUser, SchemaLogin } = require('./schemas');

const app = express();
const PORT = 3000;
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', SchemaUser, UserController);
app.use('/login', SchemaLogin, LoginController);

app.listen(PORT, () => console.log('ouvindo porta 3000!'));