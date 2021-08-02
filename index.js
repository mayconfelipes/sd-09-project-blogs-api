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

app.listen(3000, () => console.log('ouvindo porta 3000!'));