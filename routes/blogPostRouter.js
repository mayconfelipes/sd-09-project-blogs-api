const express = require('express');
const { tokenValidation, checkCategoryId, checkTitleAndContent } = require('../middlewares/index');
const { postBlogPosts, getAllPosts, getPostById } = require('../controllers/blogPost');

const blogPostRouter = express.Router();
blogPostRouter.get('/post/:id', tokenValidation, getPostById);
blogPostRouter.post('/post', checkCategoryId, checkTitleAndContent, tokenValidation, postBlogPosts);
blogPostRouter.get('/post', tokenValidation, getAllPosts);

module.exports = { blogPostRouter };
