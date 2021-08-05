const express = require('express');
const bodyParser = require('body-parser').json();

const { createUser } = require('./controllers/user');
const error = require('./middlewares/error');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use(bodyParser);
app.post('/user', createUser);
app.use(error);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
