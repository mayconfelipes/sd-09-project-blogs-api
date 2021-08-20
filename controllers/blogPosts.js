const { Router } = require('express');
const rescue = require('express-rescue');

const blogPostsServices = require('../services/blogPosts');
const usersServices = require('../services/users');
const { validateToken } = require('../middlewares/token');
const { validatePost, verifyCategories } = require('../middlewares/blogPosts');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NOT_FOUND_STATUS = 400;

const postControllers = new Router();

postControllers.post('/', validateToken, validatePost,
  rescue(async (req, res, _next) => {
    const { title, content, categoryIds } = req.body;
    const { email } = req.user;
    const { id } = await usersServices.getUserByEmail(email);
    const result = await verifyCategories(categoryIds);
    if (!result) {
      const message = '"categoryIds" not found';
      return res.status(NOT_FOUND_STATUS).json({ message });
    }
    const newPost = await blogPostsServices
      .createPost(title, content, id);
    return res.status(CREATED_STATUS).json(newPost);
  }));

postControllers.get('/', validateToken, rescue(async (_req, res, _next) => {
  const result = await blogPostsServices.getAllPosts();
  return res.status(OK_STATUS).json(result);
}));

module.exports = postControllers; 
