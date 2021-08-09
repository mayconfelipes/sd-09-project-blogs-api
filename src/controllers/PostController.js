const express = require('express');
const PostService = require('../services/PostService');
const { HTTP_CREATED_STATUS } = require('../helpers/statusProtocoloHTTP');
const { validateToken } = require('../middlewares/validateToken');
const { categoryExists, validateDataPost } = require('../middlewares/validatePost');

const PostRoute = express.Router();

PostRoute.post('/', validateToken, validateDataPost, categoryExists,
 async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.user;
try {
  const post = await PostService.createPost(id, title, content);
  return res.status(HTTP_CREATED_STATUS).json(post);
} catch (error) {
  return next(error);
}
});

module.exports = PostRoute;