const express = require('express');

const PostsRoutes = express.Router();
const PostsController = require('../controllers/posts');
const validateToken = require('../middlwares/validateToken');

PostsRoutes.post('/post', validateToken, PostsController.createPost);
PostsRoutes.get('/post', validateToken, PostsController.listsPosts);
PostsRoutes.get('/post/:id', validateToken, PostsController.listsPosts);

module.exports = PostsRoutes;