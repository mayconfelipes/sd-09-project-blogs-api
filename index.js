const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const UsersController = require('./controllers/UsersController');
const BlogPostsController = require('./controllers/BlogPostsController');
const CategoriesController = require('./controllers/CategoriesController');
const auth = require('./middlewares/auth');

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('O Pai Tá ON!!!'));

app.get('/', (req, res) => {
  res.send('Pai tá ON!!!');
});

app.get('/user', auth, UsersController.getAll);
app.get('/user/:id', auth, UsersController.getbyId);
app.post('/user', UsersController.addUser);
app.post('/login', UsersController.login);

app.get('/categories', auth, CategoriesController.getAll);
app.get('/categories/:id', auth, CategoriesController.getByIdCat);
app.post('/categories', auth, CategoriesController.addCategorie);

app.get('/post', auth, BlogPostsController.getAll);
app.get('/post/:id', auth, BlogPostsController.getPostById);
app.put('/post/:id', auth, BlogPostsController.updatePost);
app.delete('/post/:id', BlogPostsController.deletPost);
app.post('/post', auth, BlogPostsController.addPost);
