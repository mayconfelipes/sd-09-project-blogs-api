const express = require('express');
const post = require('../controllers/post');
const validate = require('../middlewares/validators');

const route = express.Router();

route.use(validate.token);
route.post('/', validate.post, validate.categoryId, post.create);
route.get('/', post.findAll);
route.get('/:id', validate.postExists, post.findOne);
route.put('/:id', validate.authUser, validate.post, validate.categoryIdsExists, post.update);
route.delete('/:id', validate.postExists, validate.authUser, post.destroy);

module.exports = route;
