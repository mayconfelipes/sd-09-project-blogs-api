const Joi = require('joi');
const { Op } = require('sequelize');
const { Categories } = require('../models');

const BAD_REQUEST_STATUS = 400;

const blogPostSchema = Joi.object().keys({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
  categoryIds: Joi.array().items(Joi.number()).not().empty()
  .required(),
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

module.exports = {
  validatePost,
  verifyCategories,
};
