const { BlogPost, User, Category } = require('../models');

const GetAllBlogPost = async (_req, res, next) => {
  try {
    const all = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return res.status(200).json(all);
  } catch (err) {
    next(err);
  }
};

module.exports = GetAllBlogPost;
