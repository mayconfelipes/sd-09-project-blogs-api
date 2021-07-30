const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
// const { Users, BlogPosts, Categories, PostsCategories } = require('./models');
const UsersController = require('./controllers/UsersController');
const BlogPostsController = require('./controllers/BlogPostsController');
const CategoriesController = require('./controllers/CategoriesController');
const auth = require('./middlewares/auth');

dotenv.config();
const app = express();
// const config = require('./config/config');

app.use(bodyParser.json());

app.listen(3000, () => console.log('O Pai Tá ON!!!'));

app.get('/', (req, res) => {
  res.send('Pai tá ON!!!');
});

app.get('/user', auth, UsersController.getAll);
app.get('/user/:id', auth, UsersController.getbyId);
app.post('/user', UsersController.addUser);
app.post('/login', UsersController.login);

app.post('/categories', auth, CategoriesController.addCategorie);

app.get('/post', auth, BlogPostsController.getAll);
app.get('/categories', auth, CategoriesController.getAll);

// npx sequelize-cli db:seed:all
// npx sequelize-cli db:drop 
