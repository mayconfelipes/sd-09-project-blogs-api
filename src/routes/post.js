const express = require('express');
// const controllers = require('../controllers/post');
const post = express.Router();

post.get('/');

module.exports = post;
