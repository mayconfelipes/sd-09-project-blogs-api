const routes = require('express').Router();

const UserRoute = require('./user');
const LoginRoute = require('./login');

routes.use('/user', UserRoute);
routes.use('/login', LoginRoute);

module.exports = routes;