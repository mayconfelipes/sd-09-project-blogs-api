const express = require('express');
const bodyParser = require('body-parser').json();
const routerUser = require('./routes/users');
const routerLogin = require('./routes/login');
const routerCategories = require('./routes/categories');

const app = express();

app.use(bodyParser);

app.use('/user', routerUser);

app.use('/login', routerLogin);

app.use('/categories', routerCategories);

app.use((err, req, res, _next) => {
  if (err.isJoi) res.status(400).json({ message: err.details[0].message });
  const internalError = 500;
  res.status(err.code ? err.code : internalError).json({ message: err.message });
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
