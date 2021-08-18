const BlogPostService = require('../services/blogPostService');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { response, code } = await BlogPostService.createPost(
      title,
      content,
      categoryIds,
      req.id,
    );
    res.status(code).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const { response, code } = await BlogPostService.getAllPosts();
    res.status(code).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { response, code } = await BlogPostService.getPostById(id);
    res.status(code).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = { createPost, getAllPosts, getPostById };
