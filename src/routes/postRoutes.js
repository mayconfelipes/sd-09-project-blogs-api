const express = require('express');
const rescue = require('express-rescue');
const { validatePost } = require('../middlewares/postValidators');
const { validateToken } = require('../middlewares/tokenValidators');
const { createPost, getAllPosts } = require('../controllers/postControllers');

const postRoute = express.Router();

postRoute.post('/', validatePost, validateToken, rescue(createPost));
postRoute.get('/', validateToken, rescue(getAllPosts));

module.exports = postRoute;