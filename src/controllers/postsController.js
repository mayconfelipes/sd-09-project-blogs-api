const postService = require('../services/postService');

const createPost = async (req, res) => {
  try {
    const { body, user } = req;
    const newPost = await postService.createPost(body, user);
    const { id, userId, title, content } = newPost;

    return res.status(201).json({ id, userId, title, content });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const { user } = req;
    const postsList = await postService.getAllPosts(user);

    return res.status(200).json(postsList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const postById = await postService.getPostById(id);

    return res.status(200).json(postById);
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const { user } = req;
    const updatedPost = await postService.updatePost(body, id, user);

    return res.status(200).json(updatedPost);
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
}; 