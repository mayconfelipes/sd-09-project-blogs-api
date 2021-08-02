const express = require('express');
const bodyParser = require('body-parser');
const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController');
const BlogsPostsController = require('./controllers/BlogsPostsController');
const authorization = require('./middlewares/auth');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', UserController.registerUser);

app.post('/login', UserController.userLogin);

app.get('/user', authorization, UserController.getAllUsers);

app.get('/user/:id', authorization, UserController.getAllUsersById);

app.post('/categories', authorization, CategoryController.addCategory);

app.get('/categories', authorization, CategoryController.getAllCategories);

app.post('/post', authorization, BlogsPostsController.addPost);

app.get('/post', authorization, BlogsPostsController.getAllBlogPosts);

app.get('/post/:id', authorization, BlogsPostsController.getAllPostsById);

app.put('/post/:id', authorization, BlogsPostsController.editPostById);

app.delete('/post/:id', authorization, BlogsPostsController.deletePost);

app.delete('/user/me', authorization, BlogsPostsController.deleteUser);