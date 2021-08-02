const express = require('express');
const mdwPost = require('../middlewares/mdwPost');
const mdwLogin = require('../middlewares/mdwLogin');

const postRouter = express.Router();

postRouter.get('/search', mdwLogin.tokenValidator, mdwPost.searchPostByQuery);
postRouter.get('/', mdwLogin.tokenValidator, mdwPost.getAllBlogPosts);
postRouter.get('/:id', mdwLogin.tokenValidator, mdwPost.getBlogPostById);
postRouter.post('/', mdwLogin.tokenValidator, mdwPost.postObjectValidator);
postRouter.put('/:id', mdwLogin.tokenValidator, mdwPost.postPutObjectValidator);
postRouter.delete('/:id', mdwLogin.tokenValidator, mdwPost.deletePost);

module.exports = postRouter;