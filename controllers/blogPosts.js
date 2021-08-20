const { Router } = require('express');
const rescue = require('express-rescue');

const blogPostsServices = require('../services/blogPosts');
const blogPostsMiddlewares = require('../middlewares/blogPosts');
const usersServices = require('../services/users');
const { validateToken } = require('../middlewares/token');
// { validatePost, verifyCategories, validateUpdate }

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;
const NOT_FOUND_STATUS = 404;

const postControllers = new Router();

postControllers.post('/', validateToken, blogPostsMiddlewares.validatePost,
  rescue(async (req, res, _next) => {
    const { title, content, categoryIds } = req.body;
    const { email } = req.user;
    const { id } = await usersServices.getUserByEmail(email);
    const result = await blogPostsMiddlewares.verifyCategories(categoryIds);
    if (!result) {
      const message = '"categoryIds" not found';
      return res.status(BAD_REQUEST_STATUS).json({ message });
    }
    const newPost = await blogPostsServices
      .createPost(title, content, id);
    return res.status(CREATED_STATUS).json(newPost);
  }));

postControllers.get('/', validateToken, rescue(async (_req, res, _next) => {
  const result = await blogPostsServices.getAllPosts();
  return res.status(OK_STATUS).json(result);
}));

postControllers.get('/:id', validateToken, rescue(async (req, res, _next) => {
  const { id } = req.params;
  const result = await blogPostsServices.getPostById(id);
  if (!result) {
    const message = 'Post does not exist';
    return res.status(NOT_FOUND_STATUS).json({ message });
  }
  return res.status(OK_STATUS).json(result);
}));

postControllers.put('/:id', validateToken, blogPostsMiddlewares.validateEdit,
  rescue(async (req, res, _next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const result = await blogPostsServices.updatePost(id, title, content);
    return res.status(OK_STATUS).json(result);
  }));

module.exports = postControllers; 
