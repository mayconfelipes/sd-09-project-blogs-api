const routes = require('express').Router();
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categoriesController = require('./controllers/categoriesController');
const postController = require('./controllers/postController');
const jwtValidator = require('./controllers/jwtValidator');

routes.post('/user', userController.create);
routes.get('/user', jwtValidator, userController.getAll);
routes.get('/user/:id', jwtValidator, userController.getId);

routes.post('/login', loginController.login);

routes.post('/categories', jwtValidator, categoriesController.create);
routes.get('/categories', jwtValidator, categoriesController.getAll);

routes.post('/post', jwtValidator, postController.create);
routes.get('/post', jwtValidator, postController.getAll);

module.exports = routes;