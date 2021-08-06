const express = require('express');
const rescue = require('express-rescue');
const postService = require('../services/postService');
const authorization = require('../middlewares/authorization');

const postRouter = express.Router();

postRouter.post('/', authorization, rescue(async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user; 
  const post = await postService.createPost(id, title, content, categoryIds);
  return res.status(201).json(post);
}));

module.exports = postRouter;