const express = require('express');
const rescue = require('express-rescue');
const { createUser } = require('./controllers/user');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', rescue(createUser));
