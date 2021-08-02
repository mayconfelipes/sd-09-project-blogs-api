const express = require('express');
const error = require('./middlewares/error');
const validateJWT = require('./middlewares/validateJWT');
const Login = require('./controllers/login');
const User = require('./controllers/user');
const Category = require('./controllers/category');
const BlogPost = require('./controllers/blogpost');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', Login);
app.get('/post/:id', validateJWT, BlogPost.readById);
app.delete('/user/me', validateJWT, BlogPost.removeSelf);
app.put('/post/:id', validateJWT, BlogPost.update);
app.delete('/post/:id', validateJWT, BlogPost.remove);
app.get('/user/:id', validateJWT, User.readById);
app.post('/user', User.create);
app.post('/post', validateJWT, BlogPost.create);
app.get('/post', validateJWT, BlogPost.read);
app.post('/categories', validateJWT, Category.create);
app.get('/categories', validateJWT, Category.read);
app.get('/user', validateJWT, User.read);

app.use(error);

app.listen(3000, () => console.log('ouvindo porta 3000!'));