const express = require('express');
const rescue = require('express-rescue');

const { postController } = require('../controllers');
const middlewares = require('../middlewares');

const route = express.Router();

route.post('/', middlewares.tokenValidation, rescue(postController.createPost));
route.get('/', middlewares.tokenValidation, rescue(postController.getAllPosts));
route.get('/:id', middlewares.tokenValidation, rescue(postController.getPostById));
route.put('/:id', middlewares.tokenValidation, rescue(postController.updatePost));

module.exports = route;
