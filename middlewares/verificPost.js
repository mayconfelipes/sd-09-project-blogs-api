const { BlogPosts } = require('../models');

const isValidUser = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const { dataValues } = await BlogPosts.findOne({ where: { id } });

  if (dataValues.userId !== userId) {
    return next({
      code: 401,
      message: 'Unauthorized user',
    });
  }
  
  next();
};

const notExistPost = async (req, res, next) => {
  const { id } = req.params;

  const post = await BlogPosts.findOne({ where: { id } });

  if (!post) {
    return next({
      code: 404,
      message: 'Post does not exist',
    });
  }
  
  next();
};

module.exports = {
  isValidUser,
  notExistPost,
};
