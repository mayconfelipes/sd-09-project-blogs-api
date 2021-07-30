const joi = require('joi');
const { Op } = require('sequelize');
const { BlogPost, Category, User } = require('../models');

const verifyPostInfos = (postInfos) => (
  joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
    categoryIds: joi.array().required(),
  }).validate(postInfos)
);

const verifyPostNewInfos = (postInfos) => (
  joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
  }).validate(postInfos)
);

const verifyCategoryIds = async (categoryIds) => {
  try {
    const categories = await Category.findAll();
    const ids = categories.map(({ id }) => id);
    const result = categoryIds.every((id) => ids.includes(id));
    return result;
  } catch (e) {
    return null;
  }
};

const postStructure = (infos, id) => ({
  ...infos,
  userId: id,
  published: new Date(),
  updated: new Date(),
});

const registerPostService = async (postInfos, { id }) => {
  const { error } = verifyPostInfos(postInfos);
  if (error) {
    return { error };
  }
  const { categoryIds, ...postContent } = postInfos;
  const categoriesExists = await verifyCategoryIds(categoryIds);
  if (!categoriesExists) {
    return ({ error: { statusCode: 400, message: '"categoryIds" not found' } });
  }
  const newPostInfos = postStructure(postContent, id);
  const newPost = await BlogPost.create(newPostInfos);
  await newPost.addCategory(categoryIds, { through: {} });
  const { published, updated, ...necessaryInfos } = newPost.toJSON();
  return { response: necessaryInfos };
};

const getAllPostsService = async () => {
  try {
    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return { response: posts };
  } catch (error) {
    return { error };
  }
};

const getPostByIdService = async (id) => {
  try {
    const post = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    if (!post) {
      return ({ error: { statusCode: 404, message: 'Post does not exist' } });
    }
    return { response: post };
  } catch (error) {
    return { error };
  }
};

const validatePostUpdate = async (id, newInfos, editorId) => {
  if (newInfos.categoryIds) {
    return ({ error: { statusCode: 400, message: 'Categories cannot be edited' } });
  }
  const { error } = verifyPostNewInfos(newInfos);
  if (error) return { error };
  const post = await BlogPost.findByPk(id);
  if (!post) return ({ error: { statusCode: 404, message: 'Post does not exist' } });
  if (post.userId !== editorId) {
    return ({ error: { statusCode: 401, message: 'Unauthorized user' } });
  }
};

const getUpdatedPost = async (postId) => {
  try {
    const updatedPost = await BlogPost.findOne({
      where: { id: postId },
      attributes: { exclude: ['published', 'updated'] },
      include: { model: Category, as: 'categories', through: { attributes: [] } },
    });
    const { id, ...necessaryInfos } = updatedPost.toJSON();
    console.log(necessaryInfos);
    return necessaryInfos;
  } catch (error) {
    console.error(error);
  }
};

const updatePostByIdService = async (id, newInfos, editorId) => {
  const isNotOk = await validatePostUpdate(id, newInfos, editorId);
  if (isNotOk) {
    const { error } = isNotOk;
    return { error };
  }
  const { title, content } = newInfos;
  try {
    await BlogPost.update(
      { title, content, updated: new Date() },
      { where: { id } },
    );
    const updatedPost = await getUpdatedPost(id);
    return { response: updatedPost };
  } catch (error) {
    return { error };
  }
};

const deletePostByIdService = async (id, userId) => {
  const post = await BlogPost.findByPk(id);
  if (!post) return ({ error: { statusCode: 404, message: 'Post does not exist' } });
  if (post.userId !== userId) {
    return ({ error: { statusCode: 401, message: 'Unauthorized user' } });
  }
  try {
    await BlogPost.destroy({ where: { id } });
  } catch (error) {
    return { error };
  }
};

// solucao sobre utilizacao do Op.like encontrada no seguinte link:
// https://sequelize.org/master/manual/model-querying-basics.html#examples-with--code-op-and--code--and--code-op-or--code-

const getPostBySearchTermService = async (searchTerm) => {
  try {
    const post = await BlogPost.findAll({
      where: { [Op.or]: [
        { title: { [Op.like]: `%${searchTerm}%` } },
        { content: { [Op.like]: `%${searchTerm}%` } },
      ] },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return { response: post };
  } catch (error) {
    return { error };
  }
};

module.exports = {
  registerPostService,
  getAllPostsService,
  getPostByIdService,
  updatePostByIdService,
  deletePostByIdService,
  getPostBySearchTermService,
};
