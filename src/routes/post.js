const express = require('express');
const post = require('../controllers/post');
const validate = require('../middlewares/validators');

const route = express.Router();

route.post('/', validate.token, validate.post, post.create);
route.get('/', validate.token, post.getAll);
route.get('/:id', validate.token, validate.postExists, post.getById);

module.exports = route;
