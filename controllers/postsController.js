const express = require('express');
const rescue = require('express-rescue');

const postServices = require('../services/postServices');
const validatePost = require('../middlewares/postSchemaValidator');
const validateJWT = require('../middlewares/validateJWT');
const { created } = require('../utils/httpStatusCodes');

const postController = express.Router();

postController.post('/', validateJWT, validatePost, rescue(async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req;

  const post = await postServices.create(title, content, categoryIds, userId);

  return res.status(created).json(post);
}));

module.exports = postController;
