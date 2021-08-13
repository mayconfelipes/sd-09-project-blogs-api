const express = require('express');
const { tokenValidation, checkTitleAndContentPost, checkCategoryId } = require('../middlewares');
const { BlogPost } = require('../models/index');

const postRouter = express.Router();

postRouter.post('/',
  checkCategoryId,
  tokenValidation,
  checkTitleAndContentPost,
  (req, res) => {
    const { content, title } = req.body;
    
    BlogPost.create({ title, content, userId: req.user })
      .then((postInfo) => res.status(201).send(postInfo.dataValues));
});

module.exports = postRouter;