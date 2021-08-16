const rescue = require('express-rescue');
const {
  checkPost,
  checkUpdatedPost,
  createPost,
  findPosts,
  findPostById,
  checkUser,
  editPost,
} = require('../services/post');
const { createPostCategory } = require('../services/postCategory');
const { findCategories } = require('../services/categories');

const newPost = rescue(async (req, res) => {
  const { body, body: { categoryIds }, user: { id } } = req;

  const { error } = checkPost(body);
  if (error) return res.status(400).json(error.details[0]);

  const categories = await findCategories();
  const exists = categoryIds
    .every((category) => categories.find((c) => c.id === category));
  if (!exists) return res.status(400).json({ message: '"categoryIds" not found' });

  const created = await createPost({ title: body.title, content: body.content, userId: id });

  categoryIds.forEach(async (category) => {
    await createPostCategory({ postId: created.id, categoryId: category });
  });

  return res.status(201).json(created);
});

const getPosts = rescue(async (_req, res) => {
  const posts = await findPosts();
  return res.status(200).json(posts);
});

const getPostById = rescue(async (req, res) => {
  const { id } = req.params;

  const post = await findPostById(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });

  return res.status(200).json(post);
});

const updatePost = rescue(async (req, res) => {
  const { body, body: { categoryIds }, user: { id }, params: { id: postId } } = req;

  if (categoryIds) return res.status(400).json({ message: 'Categories cannot be edited' });

  const { error } = checkUpdatedPost(body);
  if (error) return res.status(400).json(error.details[0]);

  const checkedUser = await checkUser(id, postId);
  if (!checkedUser) return res.status(401).json({ message: 'Unauthorized user' });

  const updated = await editPost(body, postId);
  return res.status(200).json(updated);
});
module.exports = { newPost, getPosts, getPostById, updatePost };
