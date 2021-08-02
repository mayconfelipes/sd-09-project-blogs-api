const BlogsPostsService = require('../services/BlogsPostsService');
const { Category, BlogPost, User } = require('../models/index.js');

const STATUS_404 = 404;
const STATUS_401 = 401;
const STATUS_400 = 400;
const STATUS_204 = 204;
const STATUS_201 = 201;
const STATUS_200 = 200;

const addPost = async (req, res) => {
  try {      
    const { title, content, categoryIds } = req.body;
    const { email } = req;
    const result = await BlogsPostsService.addPost(title, content, categoryIds, email);
    return res
    .status(STATUS_201)
    .json(result);
  } catch (err) {
    return res
    .status(STATUS_400)
    .json({ message: err.message });
  }
};

const getAllBlogPosts = async (req, res) => {
    try {
      const result = await BlogsPostsService.getAllBlogPosts();
      return res
      .status(STATUS_200)
      .json(result);
    } catch (err) {
      return res
      .status(STATUS_401)
      .json({ message: err.message });
    }
  };

const getAllPostsById = async (req, res) => {
  const { id } = req.params;
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { excludes: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
    if (!post) {
    return res
    .status(STATUS_404)
    .json({ message: 'Post does not exist' });
    }
    return res
    .status(STATUS_200)
    .json(post.dataValues);
};

const editPostById = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;
    const post = req.body;
    await BlogsPostsService.editPostById(id, post, token);
    const { title, content } = post;
    const postToEdit = await BlogPost.findByPk(id);
    await postToEdit.update({ title, content });
    const result = await BlogsPostsService.getPostById(id);
    return res
    .status(STATUS_200).json(result);
  } catch (err) {
    let STATUS = 401;
    if (err.message.includes('required') || err.message.includes('Categories')) STATUS = 400;
    return res
    .status(STATUS)
    .json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;
  
    await BlogsPostsService.deletePost(id, token);
    return res
    .status(STATUS_204)
    .json();
  } catch (err) {
    let STATUS = 404;
    if (err.message === 'Unauthorized user') STATUS = 401;
    return res
    .status(STATUS)
    .json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const token = req.headers.authorization;
  
    await BlogsPostsService.deleteUser(token);
    return res
    .status(STATUS_204)
    .json();
  } catch (err) {
    return res
    .status(STATUS_401)
    .json({ message: err.message });
  }
};

module.exports = {
    addPost,
    getAllBlogPosts,
    getAllPostsById,
    editPostById,
    deletePost,
    deleteUser,
};