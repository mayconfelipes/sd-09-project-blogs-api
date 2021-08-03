require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('./src/controllers');
const middlewares = require('./src/middlewares');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/user', controllers.users.create);
app.post('/login', middlewares.userLogin);
app.get('/user', middlewares.jwtValidate, controllers.users.findAll);
app.get('/user/:id', middlewares.jwtValidate, controllers.users.findById);

app.post('/categories', middlewares.jwtValidate, controllers.categories.create);
app.get('/categories', middlewares.jwtValidate, controllers.categories.findAll);

app.post('/post', middlewares.jwtValidate, controllers.blogPosts.create);

app.use(middlewares.error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => response.send());
