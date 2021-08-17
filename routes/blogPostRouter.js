const express = require('express');
const { 
  tokenValidation, 
  checkCategoryId, 
  checkTitleAndContent, 
  checkCategoryIdNotUpdate,
  checkPostUser,
} = require('../middlewares/index');
const { postBlogPosts, getAllPosts, getPostById, updateById } = require('../controllers/blogPost');

const blogPostRouter = express.Router();
blogPostRouter.get('/post/:id', tokenValidation, getPostById);
blogPostRouter.put('/post/:id', 
tokenValidation,
checkPostUser,
checkTitleAndContent,
checkCategoryIdNotUpdate, 
updateById);
blogPostRouter.post('/post', checkCategoryId, checkTitleAndContent, tokenValidation, postBlogPosts);
blogPostRouter.get('/post', tokenValidation, getAllPosts);

module.exports = { blogPostRouter };
