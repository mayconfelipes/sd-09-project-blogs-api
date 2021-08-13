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
  console.log(`Imprimindo valor de posts/controllers ${posts}`);
  return response.status(200).json(posts);
});

module.exports = {
  insertPost,
  listPosts,
};