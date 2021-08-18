const express = require('express');
const rescue = require('express-rescue');

const validateToken = require('../middlewares/validateToken');
const { validateNewPost, validateUpdate } = require('../middlewares/validatePost');
const {
  createPostController,
  getAllPostsController,
  getPostByIdController,
  updatePostController,
  deletePostController,
} = require('../controllers/postController');

const postRouter = express.Router();

postRouter.post(
  '/',
  validateToken,
  validateNewPost,
  rescue(createPostController),
);

postRouter.get('/', validateToken, rescue(getAllPostsController));
postRouter.get('/:id', validateToken, rescue(getPostByIdController));

postRouter.put(
  '/:id',
  validateToken,
  validateUpdate,
  rescue(updatePostController),
);

postRouter.delete('/:id', validateToken, rescue(deletePostController));

module.exports = postRouter;