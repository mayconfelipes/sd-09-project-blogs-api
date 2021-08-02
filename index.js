const express = require('express');
const User = require('./controllers/UsersController');
const Categorie = require('./controllers/CategorieController');
const errorMiddleware = require('./middlewares/error');
const { userValidate } = require('./middlewares/tokenValidation');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/user', User.create);
app.post('/login', User.login);
app.get('/user', userValidate, User.getAll);
app.get('/user/:id', userValidate, User.getOne);
app.post('/categories', userValidate, Categorie.create);

app.use(errorMiddleware);
