const express = require('express');

const router = express.Router();

const { createPost, findAllBlogPost } = require('../postController');

const { validateToken } = require('../../utils/validateToken');

router.post('/', validateToken, createPost);
router.get('/', validateToken, findAllBlogPost);

module.exports = router;
