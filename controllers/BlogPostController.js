const BlogPostService = require('../services/blogPostService');
const { messages, codes } = require('../util/responseHandling');

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
  } catch (error) {
    res.status(codes.CODE_500).json({ message: messages.UNEXPECTED_ERROR, error });
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const { response, code } = await BlogPostService.getAllPosts();
    res.status(code).json(response);
  } catch (error) {
    res.status(codes.CODE_500).json({ message: messages.UNEXPECTED_ERROR, error });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { response, code } = await BlogPostService.getPostById(id);
    res.status(code).json(response);
  } catch (error) {
    res.status(codes.CODE_500).json({ message: messages.UNEXPECTED_ERROR, error });
  }
};

const editPost = async (req, res) => {
  try {
    const { id } = req.params;

    const { response, code } = await BlogPostService.editPost(req.body, req.id, id);
    res.status(code).json(response);
  } catch (error) {
    res.status(codes.CODE_500).json({ message: messages.UNEXPECTED_ERROR, error });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { response, code } = await BlogPostService.deletePost(req.id, id);
    res.status(code).json(response);
  } catch (error) {
    res.status(codes.CODE_500).json({ message: messages.UNEXPECTED_ERROR, error });
  }
};

const getBySeach = async (req, res) => {
  try {
    const { q } = req.query;
    console.log('controller');
    const { response, code } = await BlogPostService.getBySeach(q);
    res.status(code).json(response);
  } catch (error) {
    res.status(codes.CODE_500).json({ message: messages.UNEXPECTED_ERROR, error });
  }
};

module.exports = { createPost, getAllPosts, getPostById, editPost, deletePost, getBySeach };
