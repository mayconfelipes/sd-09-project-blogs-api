const express = require('express');
const mdwPost = require('../middlewares/mdwPost');
const mdwLogin = require('../middlewares/mdwLogin');

const postRouter = express.Router();

postRouter.get('/', mdwLogin.tokenValidator, mdwPost.getAllBlogPosts);
postRouter.get('/:id', mdwLogin.tokenValidator, mdwPost.getBlogPostById);
postRouter.post('/', mdwLogin.tokenValidator, mdwPost.postObjectValidator);

module.exports = postRouter;