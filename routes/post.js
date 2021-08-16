const express = require('express');
const tokenValidate = require('../middlewares/tokenValidate');
const controllers = require('../controllers/post');

const post = express.Router();

post.post('/', tokenValidate, controllers.newPost);
post.get('/', tokenValidate, controllers.getPosts);
post.get('/search', tokenValidate, controllers.searchPost);
post.get('/:id', tokenValidate, controllers.getPostById);
post.put('/:id', tokenValidate, controllers.updatePost);
post.delete('/:id', tokenValidate, controllers.deletePost);

module.exports = post;
