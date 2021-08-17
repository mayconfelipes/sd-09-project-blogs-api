const rescue = require('express-rescue');

const postServices = require('../services/posts');

const HTTP_STATUS_CREATED = 201;

const createPost = rescue(async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const userId = req.user.id;

  const result = await postServices.createPost({ title, content, categoryIds, userId });

  return res.status(HTTP_STATUS_CREATED).json(result);
});

module.exports = {
  createPost,  
};
