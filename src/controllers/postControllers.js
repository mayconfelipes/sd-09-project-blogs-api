const postServices = require('../services/postServices');

const postNewPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req;
  try {
    const result = await postServices.postNewPost({ userId, title, content, categoryIds });

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const result = await postServices.getAllPosts();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getPostByPostId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await postServices.getPostByPostId(id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { userId } = req;

    const result = await postServices.updatePost({ userId, id, title, content });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    await postServices.deletePost({ id, userId });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const searchPost = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) return res.status(200).json(await postServices.getAllPosts());

    const result = await postServices.searchPost(q);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postNewPost,
  getAllPosts,
  getPostByPostId,
  updatePost,
  deletePost,
  searchPost,
};
