const express = require('express');
const tokenValidate = require('../middlewares/tokenValidate');
const controllers = require('../controllers/post');

const post = express.Router();

post.post('/', tokenValidate, controllers.newPost);
post.get('/', tokenValidate, controllers.getPosts);
post.get('/:id', tokenValidate, controllers.getPostById);

module.exports = post;
