const express = require('express');
const post = require('../controllers/post');
const validate = require('../middlewares/validators');

const route = express.Router();

route.use(validate.token);
route.post('/', validate.post, validate.categIds, post.create);
route.get('/', post.findAll);
route.get('/search', post.search);
route.get('/:id', validate.postExist, post.findOne);
route.put('/:id', validate.authUser, validate.post, validate.categIdsReq, post.update);
route.delete('/:id', validate.postExist, validate.authUser, post.destroy);

module.exports = route;
