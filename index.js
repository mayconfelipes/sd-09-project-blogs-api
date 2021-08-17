const express = require('express');
const bodyParser = require('body-parser');
const UserRouter = require('./rotes/User');
const LoginRouter = require('./rotes/Login');
const CategoriesRouter = require('./rotes/Categories');

const app = express();

app.use(bodyParser.json());

app.use(UserRouter);
app.use(LoginRouter);
app.use(CategoriesRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
