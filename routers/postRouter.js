const express = require('express');
const rescue = require('express-rescue');

const validateToken = require('../middlewares/validateToken');
const { validateNewPost } = require('../middlewares/validatePost');
const {
  createPostController,
  getAllPostsController,
} = require('../controllers/postController');

const postRouter = express.Router();

postRouter.post(
  '/',
  validateToken,
  validateNewPost,
  rescue(createPostController),
);

postRouter.get('/', validateToken, rescue(getAllPostsController));

module.exports = postRouter;