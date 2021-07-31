const postService = require('../service/post');

const createPost = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { title, content, categoryIds } = req.body;
    const newPost = await postService.createNewPost(title, content, categoryIds, token);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
};