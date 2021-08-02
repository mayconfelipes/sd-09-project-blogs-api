const routes = require('express').Router();

const users = require('./controllers/usersController');
const logins = require('./controllers/loginsController');
const categories = require('./controllers/categoriesController');
const blogPosts = require('./controllers/blogPostsController');

routes.post('/user', users.create);
routes.get('/user', users.findAll);
routes.get('/user/:id', users.findById);

routes.post('/login', logins.login);

routes.post('/categories', categories.create);
routes.get('/categories', categories.findAll);

routes.post('/post', blogPosts.create);
routes.get('/post', blogPosts.findAll);
routes.get('/post/:id', blogPosts.findById);
routes.put('/post/:id', blogPosts.update);

module.exports = routes;
