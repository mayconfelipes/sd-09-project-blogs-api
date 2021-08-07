const bodyParser = require('body-parser');
const express = require('express');
const { user, login } = require('./routes');

const app = express();
app.use(bodyParser.json());

app.use('/user', user);

app.use('/login', login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
