const rescue = require('express-rescue');
const validateToken = require('../middlewares/validateToken');
const validations = require('../middlewares/validations');

const postService = require('../services/postService');

const httpStatus = require('../middlewares/httpStatus');

const createPost = [
  validations.postsValidate,
  validations.isCategoryIdEmpty,
  validateToken,
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { id: userId } = req.user.dataValues;
    const post = await postService.createPost(title, content, userId);
    return res.status(httpStatus.CREATED).json(post);
  }),
];

module.exports = {
  createPost,
};