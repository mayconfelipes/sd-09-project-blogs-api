const express = require('express');

const User = require('./controllers/User');
const Login = require('./controllers/Login');
const Category = require('./controllers/Category');
const BlogPost = require('./controllers/BlogPost');

const validateJWT = require('./auth/validateJWT');
const error = require('./middlewares/error');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// post endpoints
app.post('/user', User.setNew);
app.post('/login', Login.loginUser);
app.post('/categories', validateJWT, Category.setNew);
app.post('/post', validateJWT, BlogPost.setNew);

// get endpoints
app.get('/user', validateJWT, User.getAll);
app.get('/user/:id', validateJWT, User.getById);

app.get('/categories', validateJWT, Category.getAll);

app.get('/post', validateJWT, BlogPost.getAll);
app.get('/post/:id', validateJWT, BlogPost.getById);

// put endpoints
app.put('/post/:id', validateJWT, BlogPost.updateById);

// delete endpoints
app.delete('/post/:id', validateJWT, BlogPost.deleteById);
app.delete('/user/me', validateJWT, User.deleteUser);

// middleware when got an error in any endpoint above
app.use(error);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
