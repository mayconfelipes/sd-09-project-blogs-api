const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser').json();

const userControllers = require('./controllers/user');
const { error, validateUser } = require('./middlewares/index');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use(bodyParser);
app.use(error);
app.post('/user', rescue(validateUser, userControllers.createUser));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
