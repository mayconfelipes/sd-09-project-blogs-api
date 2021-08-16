const postRouter = require('express').Router();

const Post = require('../controllers/post');

postRouter.post('/post', Post.createPost);
postRouter.get('/post', Post.getPost);
postRouter.get('/post/:id', Post.getPostById);
postRouter.put('/post/:id', Post.editPost);
postRouter.delete('/post/:id', Post.deletePost);
postRouter.get('/post/search', Post.searchPost);

module.exports = postRouter;
