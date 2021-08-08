const { Router } = require('express');
const Auth = require('../middlewares/Auth');
const EditPostSchema = require('../middlewares/EditPostSchema');
const NewPostSchema = require('../middlewares/NewPostSchema');
const BlogPost = require('../services/BlogPost');

const BlogPostRouter = Router();

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;

BlogPostRouter.post('/', Auth, NewPostSchema, async (req, res, next) => {
  try {
    const postData = req.body;
    const { id } = req.userData;
    const post = await BlogPost.create(postData, id);
    res.status(HTTP_CREATED).json(post);
  } catch (err) {
    next(err);
  }
});

BlogPostRouter.get('/', Auth, async (_req, res, next) => {
  try {
    const posts = await BlogPost.getAll();
    res.status(HTTP_OK).json(posts);
  } catch (err) {
    next(err);
  }
});

BlogPostRouter.get('/:id', Auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.getById(id);
    res.status(HTTP_OK).json(post);
  } catch (err) {
    next(err);
  }
});

BlogPostRouter.put('/:id', Auth, EditPostSchema, async (req, res, next) => {
  try {
    const { id } = req.params;
    const newPostData = req.body;
    const { id: userId } = req.userData;
    const post = await BlogPost.updateById(id, userId, newPostData);
    res.status(HTTP_OK).json(post);
  } catch (err) {
    next(err);
  }
});

BlogPostRouter.delete('/:id', Auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.userData;
    await BlogPost.deleteById(id, userId);
    res.status(HTTP_NO_CONTENT).end();
  } catch (err) {
    next(err);
  }
});

module.exports = { BlogPostRouter };
