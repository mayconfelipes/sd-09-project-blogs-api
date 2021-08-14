const express = require('express');
const PostService = require('../services/PostService');
const {
  HTTP_CREATED_STATUS,
  HTTP_OK_STATUS,
  HTTP_NOCONTENT_STATUS,
} = require('../helpers/statusProtocoloHTTP');
const { validateToken } = require('../middlewares/validateToken');
const {
  categoryExists,
  validateDataPostCreate,
  validatePostExists,
  validateCameWithCategories,
  validatePostUser,
  validateDataPostUpdate,
} = require('../middlewares/validatePost');

const PostRoute = express.Router();

PostRoute.post('/', validateToken, validateDataPostCreate, categoryExists,
  async (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    try {
      const post = await PostService.createPost(id, title, content);
      await PostService.CreatePostCategory(categoryIds, post.id);
      return res.status(HTTP_CREATED_STATUS).json(post);
    } catch (error) {
      return next(error);
    }
  });

PostRoute.get('/', validateToken, async (_req, res, next) => {
  try {
    const posts = await PostService.getPostsAll();
    return res.status(HTTP_OK_STATUS).json(posts);
  } catch (error) {
    return next(error);
  }
});

PostRoute.get('/search', validateToken, async (req, res, next) => {
  const search = req.query.q;
  try {
    const posts = await (!search
      ? PostService.getPostsAll()
      : PostService.SearchPost(search));

    return res.status(HTTP_OK_STATUS).json(posts);
  } catch (error) {
    return next(error);
  }
});

PostRoute.get('/:id', validateToken, validatePostExists,
  async (req, res, next) => {
    const { post } = req;
    try {
      return res.status(HTTP_OK_STATUS).json(post);
    } catch (error) {
      return next(error);
    }
  });

PostRoute.put('/:id', validateToken, validatePostUser, validateCameWithCategories,
  validateDataPostUpdate, async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      const post = await PostService.updatePost(title, content, id);
      return res.status(HTTP_OK_STATUS).json(post);
    } catch (error) {
      return next(error);
    }
  });

PostRoute.delete('/:id', validateToken, validatePostExists, validatePostUser,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      await PostService.deletePost(id);
      return res.status(HTTP_NOCONTENT_STATUS).send();
    } catch (error) {
      next(error);
    }
  });

module.exports = PostRoute;
