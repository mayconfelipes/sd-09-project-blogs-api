const express = require('express');
const {
  addPost,
  getAllPosts,
  getPostById,
  updatedPost,
  deletePost,
} = require('../Controllers/BlogPostController');
const validateJWT = require('../Auth/validateJWT');

const router = express.Router();

router.post('/', validateJWT, addPost);
router.get('/', validateJWT, getAllPosts);
router.get('/:id', validateJWT, getPostById);
router.put('/:id', validateJWT, updatedPost);
router.delete('/:id', validateJWT, deletePost);

module.exports = router;