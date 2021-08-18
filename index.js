const express = require('express');
const { insertUser } = require('./controllers/user');
const { validateEmail, validateNamePassword } = require('./services/user');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.post('/user', validateEmail, validateNamePassword, insertUser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
