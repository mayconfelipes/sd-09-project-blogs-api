const routes = require('express').Router();
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categoriesController = require('./controllers/categoriesController');
const jwtValidator = require('./services/jwtValidator');

routes.post('/user', userController.create);
routes.get('/user', jwtValidator, userController.getAll);
routes.get('/user/:id', jwtValidator, userController.getId);

routes.post('/login', loginController.login);

routes.post('/categories', jwtValidator, categoriesController.create);
routes.get('/categories', jwtValidator, categoriesController.getAll);

module.exports = routes;