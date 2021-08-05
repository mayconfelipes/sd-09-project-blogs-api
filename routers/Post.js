const express = require('express');
const {
  addPost,
  getAllPosts,
  getPostById,
  updatedPost,
  deletePost,
} = require('../Controllers/postController');

const router = express.Router();

router.post('/', addPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', updatedPost);
router.delete('/:id', deletePost);

module.exports = router;