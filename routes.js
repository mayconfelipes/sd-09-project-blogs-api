const routes = require('express').Router();
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');

routes.post('/user', userController.create);

routes.post('/login', loginController.login);

module.exports = routes;