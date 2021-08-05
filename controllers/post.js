const express = require('express');
const Service = require('../services/post');
const StatusCode = require('../util/statusCode');
const validadeRequestBody = require('../middlewares/validateRequestBody');
const validadeToken = require('../middlewares/validadeToken');
const ErrorHandler = require('../middlewares/errorHandler');

const router = express.Router();

router.post('/', validadeToken, validadeRequestBody.createPost, async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { user } = req;
    const post = await Service.create(title, content, categoryIds, user);
    res.status(StatusCode.created).json(post);
  } catch (err) {
      next(err);
  }
});

router.get('/', validadeToken, async (req, res, next) => {
  try {
    const posts = await Service.findAll();
    res.status(StatusCode.ok).json(posts);
  } catch (err) {
    next(err);
  }
});

router.use(ErrorHandler);

module.exports = router;