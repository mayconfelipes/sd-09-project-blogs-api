const express = require('express');

const router = express.Router();

const { createPost } = require('../postController');

const { validateToken } = require('../../utils/validateToken');

router.post('/', validateToken, createPost);

module.exports = router;
