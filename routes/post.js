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

router.get(
  '/post',
  helperValidateToken,
  postController.listPosts,
);

router.get(
  '/post/:id',
  helperValidateToken,
  postController.postById,
  );

router.put(
  '/post/:id',
  helperValidateToken,
  postService.validateTitle,
  postService.validateContent,
  postService.editCategories,
  postService.validUser,
  postController.updatePost,
);

module.exports = router;