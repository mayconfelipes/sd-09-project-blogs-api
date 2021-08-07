const { createBlogPosts, getAllPosts } = require('../services/blogPosts');

const CODE_201 = 201;
const CODE_200 = 200;
const CODE_401 = 401;
const CODE_400 = 400;
// // const CODE_404 = 404;
// // const CODE_409 = 409;

const createPosts = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    const newPost = await createBlogPosts(title, content, categoryIds, id);
    return res.status(CODE_201).json(newPost);
  } catch (err) {
    return res.status(CODE_400).json({ message: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const getAll = await getAllPosts();
    return res.status(CODE_200).json(getAll);
  } catch (err) {
    return res.status(CODE_401).json({ message: err.message });
  }
};

module.exports = {
  createPosts,
  getPosts,
};
