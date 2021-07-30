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

app.post('/user', UsersController.addUser);
app.post('/login', UsersController.login);

// app.get('/post', async (_req, res) => {
//   try {
//     const posts = await BlogPosts.findAll();
//     return res.status(200).json(posts);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: 'Ocorreu um erro' });
//   }
// });
// app.post('/user', createUser);
app.get('/post', auth, BlogPostsController.getAll);
app.get('/categories', auth, CategoriesController.getAll);

// npx sequelize-cli db:seed:all
// npx sequelize-cli db:drop 
