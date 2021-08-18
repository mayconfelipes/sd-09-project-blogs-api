const express = require('express');

const { createPost, getAllPosts } = require('../controllers/posts');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', middlewares.validateJWT, createPost);
router.get('/', middlewares.validateJWT, getAllPosts);

module.exports = router;
