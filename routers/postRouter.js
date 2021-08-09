const express = require('express');
const rescue = require('express-rescue');
// rescue se comporta como um try catch para capturar os erros e passar pro middleware de erros genericos
const postController = require('../controllers/postController');
const validateToken = require('../middlewares/validateToken');
const validateNewPost = require('../middlewares/validateNewPost');

const postRouter = express.Router();

postRouter.post('/', [validateToken, validateNewPost], rescue(postController.createPost));
postRouter.get('/', validateToken, rescue(postController.getAllPosts));

module.exports = postRouter;