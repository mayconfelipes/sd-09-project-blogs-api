const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');
const getError = require('./middlewares/error');
const { validateUser, validateLogin, verifyToken } = require('./middlewares/validateUser');
const { validateCategory } = require('./middlewares/validateCategory');
const { validatePost } = require('./middlewares/validatePost.js');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', validateUser, controllers.User.createUser);

app.get('/user', verifyToken, controllers.User.getAllUsers);

app.get('/user/:id', verifyToken, controllers.User.getUser);

app.post('/login', validateLogin, controllers.User.loginUser);

app.post('/categories', verifyToken, validateCategory, controllers.Category.createCategory);

app.post('/post', verifyToken, validatePost, controllers.BlogPost.createPost);

app.get('/post', verifyToken, controllers.BlogPost.getAllPosts);

app.get('/categories', verifyToken, controllers.Category.getAllCategory);

app.use(getError);