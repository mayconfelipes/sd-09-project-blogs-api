const postServices = require('../services/postServices');

const postNewPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req;
  try {
    const result = await postServices.postNewPost({ userId, title, content, categoryIds });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postNewPost,
};
