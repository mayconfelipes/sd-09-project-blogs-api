const express = require('express');
const bodyParser = require('body-parser');
const { UserController, CategoryController, BlogPostController } = require('./controllers');
const ErrorMiddleware = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', UserController.createUser);

app.post('/login', UserController.userLogin);

app.get('/user', UserController.getAllUsers);

app.get('/user/:id', UserController.getUserById);

app.delete('/user/me', UserController.deleteUser);

app.post('/categories', CategoryController.createCategory);

app.get('/categories', CategoryController.getAllCategories);

app.post('/post', BlogPostController.createPost);

app.get('/post', BlogPostController.getAllPosts);

app.get('/post/search', BlogPostController.findByQuery);

app.get('/post/:id', BlogPostController.getPostById);

app.put('/post/:id', BlogPostController.editPost);

app.delete('/post/:id', BlogPostController.deletePost);

app.use(ErrorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
