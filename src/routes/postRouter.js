const postRouter = require('express').Router();

const Post = require('../controllers/post');

postRouter.post('/post', Post.create);
postRouter.get('/post', Post.list);
postRouter.get('/post/:id', Post.listById);
postRouter.put('/post/:id', Post.edit);
postRouter.delete('/post/:id', Post.exclude);
postRouter.get('/post/search', Post.search);

module.exports = postRouter;
