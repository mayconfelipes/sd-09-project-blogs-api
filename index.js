const express = require('express');
const { user, login, categories, post } = require('./src/routes');

const app = express();

app.use(express.json());

app.use('/user', user);
app.use('/login', login);
app.use('/categories', categories);
app.use('/post', post);

app.use((err, _req, res, _next) => {
  if (!res.status) return res.status(500).json(err);
  res.status(err.status).json({ message: err.message });
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
