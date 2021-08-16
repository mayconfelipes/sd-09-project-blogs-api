const rescue = require('express-rescue');
const postService = require('../services/post');

const insertPost = rescue(async (request, response) => {
  const newPost = request.body;
  const { id: userId } = request.user;
  const post = await postService.insertPost(newPost, userId);
  return response.status(201).json(post);
});

const listPosts = rescue(async (request, response) => {
  const posts = await postService.listPosts();
  // console.log(`Imprimindo valor de posts/controllers ${posts}`);
  return response.status(200).json(posts);
});

const postById = rescue(async (request, response) => {
  const { id } = request.params;
  const postId = await postService.postById(id);

  if (!postId) return response.status(404).json({ message: 'Post does not exist' });

  return response.status(200).json(postId);
});

const updatePost = rescue(async (request, response) => {
  const { id } = request.params;
  const { title, content } = request.body;
  const post = await postService.updatePost(id, title, content);

  response.status(200).json(post);
});

module.exports = {
  insertPost,
  listPosts,
  postById,
  updatePost,
};