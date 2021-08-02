const express = require('express');
const bodyParser = require('body-parser');

const middlewares = require('./middlewares');
const { authorization } = require('./middlewares/authorization');

const user = require('./controllers/users');
const { login } = require('./controllers/login');
const category = require('./controllers/categories');
const blogPost = require('./controllers/blogPosts');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Requisito 01
app.post('/user', user.create);

// Requisito 02
app.post('/login', login);

// Requisito 03
app.get('/user', authorization, user.getAll);

// Requisito 04
app.get('/user/:id', authorization, user.getById);

// Requisito 05
app.post('/categories', authorization, category.create);

// Requisito 06
app.get('/categories', authorization, category.getAll);

// Requisito 07
app.post('/post', authorization, blogPost.create);

// Requisito 08
app.get('/post', authorization, blogPost.getAll);

// Requisito 09
app.get('/post/:id', authorization, blogPost.getById);

// Requisito 10
app.put('/post/:id', authorization, blogPost.update);

// Requisito 11
app.delete('/post/:id', authorization, blogPost.remove);

// Requisito 12
app.delete('/user/me', authorization, user.remove);

app.use(middlewares.error);

app.listen(3000, () => console.log('ouvindo porta 3000!')); 

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
