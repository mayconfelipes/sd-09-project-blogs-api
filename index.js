const express = require('express');
const bodyParser = require('body-parser');
const users = require('./src/routes/users');
const categories = require('./src/routes/categories');
const login = require('./src/routes/login');
const post = require('./src/routes/post');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', users);
app.use('/login/', login);
app.use('/categories', categories);
app.use('/post', post);