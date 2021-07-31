const Joi = require('joi');
const { Post, Categorie } = require('../models');

const postSchema = Joi.object({
  title: Joi.string().required(),
  categoryIds: Joi.array().required(),
  content: Joi.string().required(),
});

const validateError = (status, message) => ({ status, message });

const create = async ({ title, categoryIds, content, userId }) => {
  const { error } = postSchema.validate({ title, categoryIds, content });
  if (error) throw validateError(400, error.details[0].message);
  const categoryIdValid = await categoryIds.map(async (catId) => Categorie.findByPk(catId));
  console.log(categoryIdValid, 'id validos');
  const createdObject = Post.create({ title, content, userId, categoryIds });
  const { id } = createdObject.dataValues;
  return id;
};

module.exports = {
  create,
};