const postsService = require('../services/postsService');

const createPost = async (req, res, next) => {
  try {
    const post = req.body;
    const { id: userId } = req.user;
    const newPost = await postsService.createPost(post, userId);
    return res.status(201).json(newPost);
  } catch (err) { next(err); }
};

const getPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      const postsList = await postsService.getAllPosts();
      return res.status(200).json(postsList);
    }
    const postById = await postsService.getPostById(id);
    return res.status(200).json(postById);
  } catch (err) { next(err); }
};

module.exports = {
  createPost,
  getPosts,
};
