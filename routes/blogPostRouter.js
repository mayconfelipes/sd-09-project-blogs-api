const express = require('express');
const { tokenValidation, checkCategoryId, checkTitleAndContent } = require('../middlewares/index');
const { postBlogPosts } = require('../controllers/blogPost');

const blogPostRouter = express.Router();

blogPostRouter.post('/post', checkCategoryId, checkTitleAndContent, tokenValidation, postBlogPosts);

module.exports = { blogPostRouter };
