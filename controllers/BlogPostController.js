const BlogPostService = require('../services/blogPostService');
const { messages } = require('../util/responseHandling');

const { UNEXPECTED_ERROR } = messages;

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
    res.status(500).json({ message: UNEXPECTED_ERROR });
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const { response, code } = await BlogPostService.getAllPosts();
    res.status(code).json(response);
  } catch (err) {
    res.status(500).json({ message: UNEXPECTED_ERROR });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { response, code } = await BlogPostService.getPostById(id);
    res.status(code).json(response);
  } catch (err) {
    res.status(500).json({ message: UNEXPECTED_ERROR });
  }
};

const editPost = async (req, res) => {
  try {
    const { id } = req.params;

    const { response, code } = await BlogPostService.editPost(req.body, req.id, id);
    res.status(code).json(response);
  } catch (err) {
    res.status(500).json({ message: UNEXPECTED_ERROR });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { response, code } = await BlogPostService.deletePost(req.id, id);
    res.status(code).json(response);
  } catch (err) {
    res.status(500).json({ message: UNEXPECTED_ERROR });
  }
};

module.exports = { createPost, getAllPosts, getPostById, editPost, deletePost };
