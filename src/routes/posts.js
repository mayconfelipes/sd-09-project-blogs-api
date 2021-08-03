const express = require('express');
const postsController = require('../controllers/posts');

const route = express.Router();

route.post('/', postsController.createNew);
route.get('/', postsController.getAll);

module.exports = route;