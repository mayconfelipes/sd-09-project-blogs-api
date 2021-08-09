const express = require('express');
const bodyParser = require('body-parser').json();
const categoriesController = require('./src/controllers/categoriesController');
const postsController = require('./src/controllers/blogPostsController');
const usersController = require('./src/controllers/usersController');
const loginController = require('./src/controllers/loginController');

require('dotenv').config();

const app = express();
app.use(bodyParser);

app.use('/login', loginController);
app.use('/user', usersController);
app.use('post', postsController);
app.use('/categories', categoriesController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
