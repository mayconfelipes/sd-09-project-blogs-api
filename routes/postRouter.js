const express = require('express');

const postRouter = express.Router();

const validateJWT = require('../middlewares/validateJWT');

const {
  registerPostController,
  getAllPostsController,
  getPostByIdController,
  updatePostByIdController,
  deletePostByIdController,
  getPostBySearchTermController,
} = require('../controllers/postController');

postRouter.get('/search', [
  validateJWT,
  getPostBySearchTermController,
]);
postRouter.post('/', [
  validateJWT,
  registerPostController,
]);
postRouter.get('/', [
  validateJWT,
  getAllPostsController,
]);
postRouter.get('/:id', [
  validateJWT,
  getPostByIdController,
]);
postRouter.put('/:id', [
  validateJWT,
  updatePostByIdController,
]);
postRouter.delete('/:id', [
  validateJWT,
  deletePostByIdController,
]);

module.exports = postRouter;
