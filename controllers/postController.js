const rescue = require('express-rescue');
const postServices = require('../services/postServices');

const createPost = rescue(async (req, res, next) => {
  const { authorization } = req.headers;
  const blogPost = req.body;
    const result = await postServices.createPost(blogPost, authorization);
    if (result.status) return next(result);
    res.status(201).json(result);
});

module.exports = {
  createPost,
}; 