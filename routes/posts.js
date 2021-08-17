const express = require('express');

const { createPost } = require('../controllers/posts');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', middlewares.validateJWT, createPost);

module.exports = router;