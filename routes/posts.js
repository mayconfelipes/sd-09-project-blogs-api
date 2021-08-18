const express = require('express');

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/posts');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', middlewares.validateJWT, createPost);

router.get('/:id', middlewares.validateJWT, getPostById);
router.get('/', middlewares.validateJWT, getAllPosts);

router.put('/:id', middlewares.validateJWT, updatePost);

router.delete('/:id', middlewares.validateJWT, deletePost);

module.exports = router;
