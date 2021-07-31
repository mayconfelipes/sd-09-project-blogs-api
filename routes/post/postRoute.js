const express = require('express');
const rescue = require('express-rescue');

const postController = require('./postController');
const validateToken = require('../middlewares/validateToken');

const postRoute = express.Router();

postRoute.post('/', rescue(validateToken), rescue(postController.createPost));
postRoute.get('/', rescue(validateToken), rescue(postController.allPosts));
postRoute.get('/:id', rescue(validateToken), rescue(postController.findPostById));
postRoute.put('/:id', rescue(validateToken), rescue(postController.updatePost));
postRoute.delete('/:id', rescue(validateToken), rescue(postController.deletePost));

module.exports = postRoute;
