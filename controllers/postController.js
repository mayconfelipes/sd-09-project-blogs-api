const { postService } = require('../services');

const createPost = async (req, res, next) => {
  const { userEmail } = req;
  const payload = { ...req.body, userEmail };
  const newPost = await postService.createPost(payload);

  return newPost.error ? next(newPost) : res.status(201).json(newPost);
};

const getAllPosts = async (req, res, _next) => {
  const allPosts = await postService.getAllPosts();
  return res.json(allPosts);
};

const getPostById = async (req, res, next) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);

  return post.error ? next(post) : res.json(post);
};

const updatePost = async (req, res, next) => {
  const { id } = req.params;
  if (req.body.categoryIds) {
    return res.status(400).json({ message: 'Categories cannot be edited' });
  }

  const postUpdated = await postService.updatePost(id, req.body, req.userEmail);

  return postUpdated.error ? next(postUpdated) : res.json(postUpdated);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};
