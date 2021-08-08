const express = require('express');
const rescue = require('express-rescue');
// rescue se comporta como um try catch para capturar os erros e passar pro middleware de erros genericos
const postController = require('../controllers/postController');

const postRouter = express.Router();

postRouter.post('/', rescue(postController.createPost));
postRouter.get('/', rescue(postController.getAllPosts));

module.exports = postRouter;