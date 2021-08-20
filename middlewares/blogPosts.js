const Joi = require('joi');
const { Op } = require('sequelize');
const { Categories, BlogPosts, Users } = require('../models');

const BAD_REQUEST_STATUS = 400;
const UNAUTHORIZED_STATUS = 401;
const NOT_FOUND_STATUS = 404;

const blogPostSchema = Joi.object().keys({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
  categoryIds: Joi.array().items(Joi.number()).not().empty()
  .required(),
});

const updateSchema = Joi.object().keys({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
});

const validatePost = (req, res, next) => {
  const post = req.body;
  const { error } = blogPostSchema.validate(post);
  if (error) {
    return res.status(BAD_REQUEST_STATUS).json({
      message: error.details[0].message,
    });
  }
  return next();
};

const verifyCategories = async (category) => {
  const catExists = await Categories.findAll({
    where: { id: { [Op.in]: category } },
  });
  if (catExists.length === category.length) return true;
  return false;
};

const validateEdit = [
  (req, res, next) => {
    const newUpdate = req.body;
    if (newUpdate.categoryIds !== undefined) {
      return res.status(BAD_REQUEST_STATUS).json({
        message: 'Categories cannot be edited',
      });
    }
    const { error } = updateSchema.validate(newUpdate);
    if (error) {
      return res.status(BAD_REQUEST_STATUS).json({
        message: error.details[0].message,
      });
    }
    return next();
  },
  async (req, res, next) => {
    const { id } = req.params;
    const { email } = req.user;
    const { id: userId } = await Users.findOne({ where: { email } });
    const post = await BlogPosts.findOne({ where: { id } });
    let message;
    if (!post) {
      message = 'Post does not exist';
      return res.status(NOT_FOUND_STATUS).json({ message });
    }
    const { dataValues } = await BlogPosts.findOne({ where: { id } });
    const dataId = dataValues.userId;
    if (dataId !== userId) {
      message = 'Unauthorized user';
      return res.status(UNAUTHORIZED_STATUS).json({ message });
    }
    return next();
  },
];

module.exports = {
  validatePost,
  verifyCategories,
  validateEdit,
};
