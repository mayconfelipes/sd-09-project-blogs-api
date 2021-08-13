const express = require('express');
const tokenValidate = require('../middlewares/tokenValidate');
const controllers = require('../controllers/post');

const post = express.Router();

post.post('/', tokenValidate, controllers.newPost);

module.exports = post;
