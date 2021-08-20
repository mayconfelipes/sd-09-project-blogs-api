const express = require('express');
const bodyParser = require('body-parser').json();

const usersControllers = require('./controllers/users');
const loginControllers = require('./controllers/login');
const categoriesControllers = require('./controllers/categories');
const blogPostsControllers = require('./controllers/blogPosts');

const app = express();
const PORT = 3000;

app.use(bodyParser);

app.use('/user', usersControllers);
app.use('/login', loginControllers);
app.use('/categories', categoriesControllers);
app.use('/post', blogPostsControllers);

app.use((error, _req, res, _next) => {
  console.log(error);
  res.status(error.status).json({ message: error.message });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.clear();
  console.log(`ouvindo porta ${PORT}!`);
});
