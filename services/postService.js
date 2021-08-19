const Joi = require('joi');

const { Categories } = require('../models');

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.required(),
});

const validatePost = async (body) => {
  try {
    const validate = await schema.validate(body);
    return validate;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const createPostStructure = async (body, jwtData, categories) => ({
  title: body.title,
  content: body.content,
  userId: jwtData.data.id,
  user: jwtData.data,
  categories,
});

const validateIds = async (categoryIds) => {
  let invalidId = false;
  const categories = await Categories.findAll();
  categoryIds.forEach((item) => {
    const find = categories.find((categorieId) => item === categorieId.dataValues.id);
    if (!find) {
      invalidId = true;
    }
  });
  return invalidId;
};

module.exports = {
  validatePost,
  createPostStructure,
  validateIds,
};
