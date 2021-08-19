const {
  newCategory,
  getCategories,
  newPost,
  getPosts,
  getPost,
  update,
} = require('../services/postsServices');

const createCategory = async (req, res, _next) => {
  const category = req.body;
  const token = req.headers.authorization;
  const data = { category, token };

  const create = await newCategory(data);

  if (create.status) return res.status(create.status).json({ message: create.message });
  return res.status(201).json(create);
};

const getAllCategories = async (req, res, _next) => {
  const token = req.headers.authorization;

  const categoriesList = await getCategories(token);

  if (categoriesList.status) {
    return res.status(categoriesList.status)
    .json({ message: categoriesList.message });
  }

  return res.status(200).json(categoriesList);
};

const createPost = async (req, res, _next) => {
  const postData = req.body;
  const token = req.headers.authorization;
  
  const create = await newPost(postData, token);
  if (create.status) return res.status(create.status).json({ message: create.message });

return res.status(201).json(create);
 };

 const getAllPosts = async (req, res, _next) => {
  const token = req.headers.authorization;

  const allPosts = await getPosts(token);
  if (allPosts.status) return res.status(allPosts.status).json({ message: allPosts.message });

  return res.status(200).json(allPosts);
 };

 const getPostById = async (req, res, _next) => {
  const token = req.headers.authorization;
  const { id } = req.params;

  const postById = await getPost(token, id);
  if (postById.status) return res.status(postById.status).json({ message: postById.message });

  return res.status(200).json(postById);
 };

 const updatePost = async (req, res, _next) => {
  const newData = req.body;
  const token = req.headers.authorization;
  const { id } = req.params;

  const postUpdated = await update(token, newData, id);
  if (postUpdated.status) {
    return res.status(postUpdated.status).json({ message: postUpdated.message });
  }

  return res.status(200).json(postUpdated);
 };

module.exports = {
  createCategory,
  getAllCategories,
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};