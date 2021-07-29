const express = require('express');

const user = require('./routes/user');
const login = require('./routes/login');
const categories = require('./routes/categories');
const posts = require('./routes/post');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', user);
app.use('/login', login);
app.use('/categories', categories);
app.use('/post', posts);

app.listen(3000, () => console.log('ouvindo porta 3000!'));