const express = require('express');
const user = require('./src/routes/userRoutes');
const login = require('./src/routes/loginRoutes');
const categories = require('./src/routes/categoriesRoutes');
const post = require('./src/routes/postRoutes');

const app = express();

app.use(express.json());

app.use('/user', user);
app.use('/login', login);
app.use('/categories', categories);
app.use('/post', post);

app.use(({ status, message }, _req, res, _next) => {
  res.status(status).json({ message });
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
