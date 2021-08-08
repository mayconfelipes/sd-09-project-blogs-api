const express = require('express');
const posts = require('../controllers/posts');
const { token } = require('../services/users');

const route = express.Router();

route.post('/', token, posts.create);
route.get('/', token, posts.getAll);

module.exports = route;