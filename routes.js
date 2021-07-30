const routes = require('express').Router();

const users = require('./controllers/usersController');

routes.post('/user', users.create);

module.exports = routes;
