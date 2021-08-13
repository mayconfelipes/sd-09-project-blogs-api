const express = require('express');
const helperValidateToken = require('../helpers/validateToken');
const postService = require('../services/post');
const postController = require('../controllers/post');

const router = express.Router();

router.post(
  '/post',
  helperValidateToken,
  postService.validateTitle,
  postService.validateContent,
  postService.validateCategoryId,
  postService.validateCategories,
  postController.insertPost,
);

module.exports = router;