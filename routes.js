const routes = require('express').Router();
const userController = require('./controllers/userController');

routes.post('/user', userController.create);

module.exports = routes;