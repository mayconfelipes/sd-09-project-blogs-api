const rescue = require('express-rescue');
const { User } = require('../models');
const { BlogPost } = require('../models');
const { Category } = require('../models');
const { PostsCategory } = require('../models');

const insertBlogPost = rescue(async (req, res) => {
  const post = req.body;
  const { email } = req.user;
  const { title, content, categoryIds } = post;

  const { id: userId } = await User.findOne({ where: { email } });

  const newPost = await BlogPost.create({ title, content, userId });
  categoryIds.forEach(async (id) => { 
    await PostsCategory.create({ postId: newPost.id, categoryId: id }); 
  });

  return res.status(201).json(newPost);
});

const listAllPosts = rescue(async (_req, res) => {
  const posts = await BlogPost.findAll({ include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});
  return res.status(200).json(posts);
});

const getPostById = rescue(async (req, res) => {
  const { id } = req.params;
  const postId = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
  });

  return (!postId)
  ? res.status(404).json({ message: 'Post does not exist' })
  : res.status(200).json(postId);
});

const updatePost = rescue(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  await BlogPost.update({ title, content }, { where: { id } });
  const post = await BlogPost.findOne({ where: { id },
    include: [{ model: Category, as: 'categories', through: { attributes: [] } }] });

  res.status(200).json(post);
});

const deletePost = rescue(async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;
  const { id: userId } = await User.findOne({ where: { email } });

  const post = await BlogPost.findOne({ where: { id } });

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (post.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  await BlogPost.destroy({ where: { id } });
  return res.status(204).json();
});

module.exports = {
  insertBlogPost,
  listAllPosts,
  getPostById,
  updatePost,
  deletePost,
}; 