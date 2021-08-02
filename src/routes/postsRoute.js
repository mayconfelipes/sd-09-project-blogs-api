const { Router } = require('express');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
} = require('../controllers/postsController');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const PostRoute = Router();
PostRoute.route('/post')
  .post(tokenMiddleware, createPost)
  .get(tokenMiddleware, getAllPosts);

PostRoute.route('/post/:id')
  .get(tokenMiddleware, getPostById)
  .put(tokenMiddleware, updatePost);

module.exports = PostRoute;