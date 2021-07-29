const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
// const { Users, BlogPosts, Categories, PostsCategories } = require('./models');
const UsersController = require('./controllers/UsersController');

const app = express();
// const config = require('./config/config');

dotenv.config();
console.log(process.env.MYSQL_USER);
app.use(bodyParser.json());

app.listen(3000, () => console.log('O Pai Tá ON!!!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send('Pai tá ON!!!');
});

app.get('/users', UsersController.getAll);

app.get('/post', async (_req, res) => {
  try {
    const posts = await BlogPosts.findAll();
    return res.status(200).json(posts);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
});
// app.post('/user', createUser);

// npx sequelize-cli db:seed:all
// npx sequelize-cli db:drop 
