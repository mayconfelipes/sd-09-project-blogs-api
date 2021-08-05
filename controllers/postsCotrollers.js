const postsServices = require('../services/postsServices');
const { code } = require('../helpers/messages');

const createPost = async (req, res) => {
  const { body, user } = req;
  try {
    const newPost = await postsServices.createPost(body, user);
    return res.status(code.CREATED).json(newPost);
  } catch (err) {
    if (err.message === '"categoryIds" not found') {
      res.status(code.BAD_REQUEST).json({ message: err.message });
    }
    res.status(err.code).json({ message: err.message });
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const allPosts = await postsServices.getAllPosts();
    return res.status(code.OK).json(allPosts);
  } catch (err) {
    res.status(code.SERVER_err).json({ message: err.message });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const newPost = await postsServices.getPostById(id);
    return res.status(code.OK).json(newPost);
  } catch (err) {
    if (err.message === 'Post does not exist') {
      res.status(code.NOT_FOUND).json({ message: err.message });
    }
    res.status(code.SERVER_err).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const { id: userId } = req.user;
  try {
    const updated = await postsServices.updatePost(id, body, userId);
    return res.status(code.OK).json(updated);
  } catch (err) {
    if (err.message === 'Unauthorized user') {
      res.status(code.UNAUTHORIZED).json({ message: err.message });
    }
    if (err.code) return res.status(err.code).json({ message: err.message });
    res.status(code.SERVER_err).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  try {
    await postsServices.deletePost(id, userId);
    return res.status(code.NO_CONTENT).json({});
  } catch (err) {
    if (err.message === 'Unauthorized user') {
      res.status(code.UNAUTHORIZED).json({ message: err.message });
    }
    res.status(code.NOT_FOUND).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
