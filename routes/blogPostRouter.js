const express = require('express');
const { tokenValidation, checkCategoryId, checkTitleAndContent } = require('../middlewares/index');
const { postBlogPosts, getAllPosts } = require('../controllers/blogPost');

const blogPostRouter = express.Router();

blogPostRouter.post('/post', checkCategoryId, checkTitleAndContent, tokenValidation, postBlogPosts);
blogPostRouter.get('/post', tokenValidation, getAllPosts);

module.exports = { blogPostRouter };
