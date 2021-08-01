const routes = require('express').Router();
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const jwtValidator = require('./services/jwtValidator');

routes.post('/user', userController.create);
routes.get('/user', jwtValidator, userController.getAll);

routes.post('/login', loginController.login);

module.exports = routes;