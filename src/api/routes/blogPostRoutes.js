const express = require('express');

const BlogPost = require('../../controllers/BlogPost');
const { validateToken, validateBlogPostFields } = require('../../middlewares');

const router = express.Router();

router.post('/', [validateToken, validateBlogPostFields, BlogPost.create]);

router.get('/', [validateToken, BlogPost.findAll]);

module.exports = router;