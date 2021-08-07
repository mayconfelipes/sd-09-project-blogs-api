const postsServices = require('../services/postsServices');
const { code } = require('../helpers/messages');

const createPost = async (req, res) => {
  const { body, user } = req;
  try {
    const newPost = await postsServices.createPost(body, user);
    return res.status(code.CREATED).json(newPost);
  } catch (error) {
    if (error.message === '"categoryIds" not found') {
      res.status(code.BAD_REQUEST).json({ message: error.message });
    }
    res.status(error.code).json({ message: error.message });
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const allPosts = await postsServices.getAllPosts();
    return res.status(code.OK).json(allPosts);
  } catch (error) {
    res.status(code.SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
};