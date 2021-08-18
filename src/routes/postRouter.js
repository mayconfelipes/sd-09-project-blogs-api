const postRouter = require('express').Router();

const Post = require('../controllers/post');

postRouter.post('/post', Post.create);
postRouter.get('/post/search', Post.search);
postRouter.get('/post', Post.list);
postRouter.get('/post/:id', Post.listById);
postRouter.put('/post/:id', Post.edit);
postRouter.delete('/post/:id', Post.exclude);

module.exports = postRouter;
