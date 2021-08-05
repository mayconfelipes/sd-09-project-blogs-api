const addPost = async (req, res, _next) => {
  const category = req.body;
  res.status(200).json(category);
};

const getAllPosts = async (req, res, _next) => {
 const name = req.body;
 res.status(200).json(name);
};

const getPostById = async (req, res, _next) => {
  const postId = req.params;
  res.status(200).json(postId);
};

const updatedPost = async (req, res, _next) => {
  const postId = req.param;
  res.status(200).json(postId);
};

const deletePost = async (req, res, _next) => {
  const postId = req.param;
  res.status(200).json(postId);
};

module.exports = {
  addPost,
  getAllPosts,
  getPostById,
  updatedPost,
  deletePost,
};