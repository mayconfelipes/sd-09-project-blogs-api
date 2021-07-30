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
    console.log(error);
    next(error);
  }
};

module.exports = {
  postNewPost,
  getAllPosts,
};
