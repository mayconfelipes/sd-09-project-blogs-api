const bodyParser = require('body-parser');
const express = require('express');

const controllers = require('../controllers');
const { authJwt } = require('../middlewares');

const route = express.Router();
route.use(bodyParser.json());

route.post('/', authJwt, controllers.createPost);
route.get('/', authJwt, controllers.listAllPosts);
route.get('/search?', authJwt, controllers.searchTerm);
route.get('/:id', authJwt, controllers.findPostById);
route.put('/:id', authJwt, controllers.updatePostById);
route.delete('/:id', authJwt, controllers.deletePostById);

module.exports = route;
