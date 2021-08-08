const bodyParser = require('body-parser');
const express = require('express');
const { user, login, categories, post } = require('./routes');

const app = express();
app.use(bodyParser.json());

app.use('/user', user);

app.use('/login', login);

app.use('/categories', categories);

app.use('/post', post);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use((error, _req, res, _next) => {
  if (error.status) return res.status(error.status).json({ message: error.message });
  return res.status(500).json({ message: error.message });
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
