const postServices = require('../services/postServices');
const { created } = require('../helpers/getHttpStatusCode');

const createPost = async (req, res, next) => {
  const { id } = req.user;
  console.log('userId', id);
  try {
    const post = await postServices.createPost({ userId: id, ...req.body });
    return res.status(created).json(post);
  } catch (err) {
    return next(err);
  }
};

module.exports = { createPost };
