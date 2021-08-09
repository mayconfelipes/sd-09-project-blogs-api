const express = require('express');
const rescue = require('express-rescue');
// rescue se comporta como um try catch para capturar os erros e passar pro middleware de erros genericos
const postController = require('../controllers/postController');
const validateToken = require('../middlewares/validateToken');
const validateNewPost = require('../middlewares/validateNewPost');
const validateUpdate = require('../middlewares/validateUpdate');

const postRouter = express.Router();

postRouter.post('/', validateToken, validateNewPost, rescue(postController.createPost));
postRouter.get('/', validateToken, rescue(postController.getAllPosts));
postRouter.get('/search', validateToken, rescue(postController.getPostsByQuery));
postRouter.get('/:id', validateToken, rescue(postController.getPostById));
postRouter.put('/:id', validateToken, validateUpdate, rescue(postController.updatePost));
postRouter.delete('/:id', validateToken, rescue(postController.deletePost));

module.exports = postRouter;