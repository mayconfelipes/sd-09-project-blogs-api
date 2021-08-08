const routes = require('express').Router();
const bodyParser = require('body-parser');
const errorMiddleware = require('../middlewares/errorMiddleware');
const users = require('./user/controllers/user');
const login = require('./login/controllers/login');
const categories = require('./category/controllers/category');
const post = require('./post/controllers/post');
const authMiddleware = require('../middlewares/authMiddleware');

routes.use(bodyParser.json());

routes.use('/user', users);
routes.use('/login', login);
routes.use(authMiddleware);
routes.use('/categories', categories);
routes.use('/post', post);

routes.use(errorMiddleware);

module.exports = routes;
