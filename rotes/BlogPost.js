const express = require('express');
const BlogPostController = require('../controllers/BlogPostController');
const Auth = require('../auth/tokenValidator');

const Router = express.Router();

Router.post('/post', Auth.tokenValidator, BlogPostController.createPost);
Router.get('/post/search', Auth.tokenValidator, BlogPostController.getBySeach);
Router.get('/post/:id', Auth.tokenValidator, BlogPostController.getPostById);
Router.get('/post', Auth.tokenValidator, BlogPostController.getAllPosts);
Router.put('/post/:id', Auth.tokenValidator, BlogPostController.editPost);
Router.delete('/post/:id', Auth.tokenValidator, BlogPostController.deletePost);

module.exports = Router;