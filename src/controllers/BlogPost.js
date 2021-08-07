const rescue = require('express-rescue');
const BlogPost = require('../services/BlogPost');

const create = rescue(async (req, res, next) => {
  try {
    const { userId } = req;
    const { title, content, categoryIds } = req.body;
    const post = await BlogPost.create(title, content, categoryIds, userId);
  
    return res.status(201).json(post);
  } catch (error) {
    return next(error);
  }
});

module.exports = {
  create,
};
