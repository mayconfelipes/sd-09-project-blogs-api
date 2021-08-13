const express = require('express');
const PostService = require('../services/PostService');
const { HTTP_CREATED_STATUS, HTTP_OK_STATUS } = require('../helpers/statusProtocoloHTTP');
const { validateToken } = require('../middlewares/validateToken');
const {
  categoryExists,
  validateDataPost,
  validatePostExists,
} = require('../middlewares/validatePost');

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

PostRoute.get('/', validateToken,
 async (_req, res, next) => {
try {
  const posts = await PostService.getPostsAll();
  return res.status(HTTP_OK_STATUS).json(posts);
} catch (error) {
  return next(error);
}
});

PostRoute.get('/:id', validateToken, validatePostExists,
async (req, res, next) => {
  const { post } = req;
  try {
    return res.status(HTTP_OK_STATUS).json(post);
  } catch (error) {
    return next(error);
  }
});
module.exports = PostRoute;