const express = require('express');

const {
  UserController,
  LoginController,
  CategoriesController,
  PostCategoriesController,
} = require('./controllers');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', UserController);

app.use('/login', LoginController);

app.use('/categories', CategoriesController);

app.use('/post', PostCategoriesController);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
