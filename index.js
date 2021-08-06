const express = require('express');
const bodyParser = require('body-parser');
const users = require('./src/routes/users');
const categories = require('./src/routes/categories');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', users);
app.use('/categories', categories);