const express = require('express');

const postRouter = express.Router();

const validateJWT = require('../middlewares/validateJWT');

const {
  registerPostController,
  getAllPostsController,
  getPostByIdController,
} = require('../controllers/postController');

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

module.exports = postRouter;
