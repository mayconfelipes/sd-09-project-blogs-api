const { Router } = require('express');
const Auth = require('../middlewares/Auth');
const PostSchema = require('../middlewares/PostSchema');
const BlogPost = require('../services/BlogPost');

const BlogPostRouter = Router();

// const HTTP_OK = 200;
const HTTP_CREATED = 201;

BlogPostRouter.post('/', Auth, PostSchema, async (req, res, next) => {
  try {
    const postData = req.body;
    const { id } = req.userData;
    const post = await BlogPost.create(postData, id);
    res.status(HTTP_CREATED).json(post);
  } catch (err) {
    next(err);
  }
});

module.exports = { BlogPostRouter };
