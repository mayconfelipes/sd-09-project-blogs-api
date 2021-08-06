const express = require('express');
const postController = require('../controllers/postController');
const validate = require('../middlewares/validators');

const route = express.Router();

route.get('/', validate.post, validate.postExists, validate.token, postController.getAllPosts);
route.get('/:id', validate.post, validate.postExists, validate.token, postController.getPostById);

module.exports = route;
