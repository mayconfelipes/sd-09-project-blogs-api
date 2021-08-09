const express = require('express');
require('dotenv').config();
const user = require('./routes/user');
const login = require('./routes/login');
const post = require('./routes/post');
const categories = require('./routes/categories');

const app = express();

app.use('/user', user);
app.use('/login', login);
app.use('/post', post);
app.use('/categories', categories);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
