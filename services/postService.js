const Joi = require('joi');

const { BlogPost, Categories } = require('../models');

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.required(),
});

const schemaUpdate = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
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

const validateUpdatePost = async (body) => {
  try {
    const validate = await schemaUpdate.validate(body);
    return validate;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const findOnePost = async (id) => BlogPost.findByPk(id, {
  include: { model: Categories, as: 'categories', through: { attributes: [] } },
  attributes: { exclude: ['published', 'updated', 'categories'] },
});

const getPostById = async (idFromReq, userId, body) => {
  const { title, content } = body;
  let post = await findOnePost(idFromReq);
  if (post.dataValues.userId !== userId) {
    return {
      status: 401,
      res: { message: 'Unauthorized user' },
    };
  }
  console.log(post);

  await BlogPost.update({ title, content }, { where: { id: idFromReq } });

  post = await findOnePost(idFromReq);

  return {
    status: 200,
    res: post,
  };
};

module.exports = {
  validatePost,
  createPostStructure,
  validateIds,
  validateUpdatePost,
  getPostById,
};
