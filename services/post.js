const validations = require('./validations');
const jwt = require('../auth/jwt');
const { Category, BlogPost, User } = require('../models');

const isCategoryIdExist = async (ids) => {
  //  Podemos procurar colocando um array como parametro
  //  https://sequelize.org/v3/docs/models-usage/
  const response = await Category.findAll({ attributes: ['id'], raw: true });
  const validIds = response.map((category) => category.id);
  const isIdsValid = ids.every((id) => validIds.includes(id));
  if (isIdsValid) {
    return { error: false };
 }
  const message = '"categoryIds" not found';
  return { error: { name: 'invalidField', message } };
};

const createPost = async ({ title, content, categoryIds, authorization }) => {
  const responseJTW = jwt.verify(authorization);
  if (responseJTW.error) return responseJTW;

  const validResponse = await validations.noEmptyValidation(
    { title, content, categoryIds },
    ['title', 'content', 'categoryIds'],
  );
  if (validResponse.error) return validResponse;

  const responseCategoryId = await isCategoryIdExist(categoryIds);
  if (responseCategoryId.error) return responseCategoryId;

  const { id: userId } = responseJTW.user;
  const post = await BlogPost.create({ title, content, userId });

  return post.dataValues;
};

const getAllPost = async ({ authorization }) => {
  const responseJTW = jwt.verify(authorization);
  if (responseJTW.error) return responseJTW;

  const posts = await BlogPost.findAll({ 
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  
  return posts;
};

const getPostById = async ({ authorization, id }) => {
  const responseJTW = jwt.verify(authorization);
  if (responseJTW.error) return responseJTW;

  const post = await BlogPost.findOne({ 
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  
  if (!post) {
    return { error: { name: 'notFound', message: 'Post does not exist' } }; 
  }

  return post.dataValues;
};

const updatePost = async ({ authorization, id, title, content, categoryIds }) => {
  const responseJTW = jwt.verify(authorization);
  if (responseJTW.error) return responseJTW;
  const category = validations.categoryEmpty(categoryIds);
  if (category.error) return category;
  const { id: userId } = responseJTW.user;
  const isUserTheSame = await validations.isUserWhoPosted(userId, id);
  if (isUserTheSame.error) return isUserTheSame;
  const emptyFields = await validations.noEmptyValidation({ title, content }, ['title', 'content']);
  if (emptyFields.error) return emptyFields;
  await BlogPost.update({ title, content }, { where: { id } });
  const updatedPost = await BlogPost.findOne({ 
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return updatedPost;
};

const deletePost = async ({ authorization, id }) => {
  const responseJTW = jwt.verify(authorization);
  if (responseJTW.error) return responseJTW;

  const { id: userId } = responseJTW.user;
  const isUserTheSame = await validations.isUserWhoPosted(userId, id);
  if (isUserTheSame.error) return isUserTheSame;

  try {
    await BlogPost.destroy({ where: { id } });
    return { error: false };
  } catch (err) {
    return { error: { name: 'notFound', message: 'Post does not exist' } };
  }
};

module.exports = {
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
};