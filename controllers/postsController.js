const express = require('express');
const rescue = require('express-rescue');

const postServices = require('../services/postServices');
const validatePost = require('../middlewares/postSchemaValidator');
const validateJWT = require('../middlewares/validateJWT');
const { created, ok } = require('../utils/httpStatusCodes');

const postController = express.Router();

postController.post('/', validateJWT, validatePost, rescue(async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req;

  const post = await postServices.create(title, content, categoryIds, userId);

  return res.status(created).json(post);
}));

postController.get('/', validateJWT, rescue(async (req, res) => {
  const posts = await postServices.getAll();

  return res.status(ok).json(posts);
}));

module.exports = postController;
