require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser').json();
const errorMiddleware = require('./middlewares/error');
const UserController = require('./controllers/UserController');
const CategorieController = require('./controllers/CategorieController');
const PostController = require('./controllers/PostController');
const { tokenValidation } = require('./middlewares/tokenValidation');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser);

app.post('/user', UserController.createUser);
app.post('/login', UserController.userLogin);
app.get('/user', tokenValidation, UserController.getAllUser);
app.get('/user/:id', tokenValidation, UserController.getById);
app.post('/categories', tokenValidation, CategorieController.createCategorie);
app.get('/categories', tokenValidation, CategorieController.getAllCategorie);
app.post('/post', tokenValidation, PostController.createPost);
app.get('/post', tokenValidation, PostController.getAllPost);

app.use(errorMiddleware);