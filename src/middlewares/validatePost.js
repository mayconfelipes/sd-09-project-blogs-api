const Joi = require('joi');
const PostService = require('../services/PostService');
const CategoryService = require('../services/CategoriesService');
const {
  HTTP_BADREQ_STATUS,
  HTTP_NOTFOUND_STATUS,
  HTTP_UNAUTHORIZED_STATUS,
} = require('../helpers/statusProtocoloHTTP');

const schemaValidatePostCreate = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()).not().empty()
.required(),
});

const validateDataPostCreate = async (req, _res, next) => {
  const { title, content, categoryIds } = req.body;
  const validatePost = schemaValidatePostCreate.validate({
    title, content, categoryIds,
  });
  if (validatePost.error) {
    return next({ status: HTTP_BADREQ_STATUS, err: validatePost.error.details[0].message });
  }
  return next();
};
const validateCameWithCategories = async (req, res, next) => {
  if (req.body.categoryIds) {
    return next({ status: HTTP_BADREQ_STATUS, err: 'Categories cannot be edited' });
  }
  return next();
};
const schemaValidatePostUpdate = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const validateDataPostUpdate = async (req, _res, next) => {
  const { title, content } = req.body;
  const validatePost = schemaValidatePostUpdate.validate({ title, content });
  if (validatePost.error) {
    return next({ status: HTTP_BADREQ_STATUS, err: validatePost.error.details[0].message });
  }
  return next();
};
const categoryExists = async (req, _res, next) => {
  const { categoryIds } = req.body;
  const exists = await CategoryService.existsCategoriesIds(categoryIds);
  if (!exists) return next({ status: HTTP_BADREQ_STATUS, err: '"categoryIds" not found' });

  return next();
};

const validatePostExists = async (req, _res, next) => {
  const { id } = req.params;
  const post = await PostService.getPostsById(id);
  if (!post) return next({ status: HTTP_NOTFOUND_STATUS, err: 'Post does not exist' });
  req.post = post;
  return next();
};

const validatePostUser = async (req, _res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  const post = await PostService.getPostsById(id);
  if (post.userId !== userId) {
    return next({ status: HTTP_UNAUTHORIZED_STATUS, err: 'Unauthorized user' });
  }
  return next();
};
module.exports = {
  validateDataPostCreate,
  categoryExists,
  validatePostExists,
  validatePostUser,
  validateCameWithCategories,
  validateDataPostUpdate,
};