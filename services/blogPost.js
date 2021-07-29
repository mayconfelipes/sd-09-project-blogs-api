const { Category } = require('../models');
const { status, message } = require('./statusMessages');

const blogPostCheckFields = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title) {
    return res.status(status.BAD_REQUEST).json(message.postTitleEmpty);
  }
  if (!content) {
    return res.status(status.BAD_REQUEST).json(message.postContentEmpty);
  }
  return next();
};

const blogPostCheckCategory = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds || categoryIds === '') {
    return res.status(status.BAD_REQUEST).json(message.categoryIdEmpty);
  }
  // forEach para verificar se os ids do array constam no banco
  categoryIds.forEach(async (elId) => {
    const findCategoryId = await Category.findByPk(elId);
    // console.log(elId);
    // console.log(findCategoryId);
    if (!findCategoryId) {
      return res.status(status.BAD_REQUEST).json(message.categoryIdNotFound);
    }
  });
  return next();
};

module.exports = { blogPostCheckFields, blogPostCheckCategory };