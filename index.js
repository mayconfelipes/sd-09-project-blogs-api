const express = require('express');
const bodyParser = require('body-parser').json();

const usersControllers = require('./controllers/users');

const app = express();
const PORT = 3000;

app.use(bodyParser);

app.use('/user', usersControllers);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.clear();
  console.log(`ouvindo porta ${PORT}!`);
});
