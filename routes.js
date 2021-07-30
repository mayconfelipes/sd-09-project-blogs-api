const routes = require('express').Router();

const users = require('./controllers/usersController');
const logins = require('./controllers/loginsController');

routes.post('/user', users.create);
routes.get('/user', users.findAll);
routes.post('/login', logins.login);

module.exports = routes;
