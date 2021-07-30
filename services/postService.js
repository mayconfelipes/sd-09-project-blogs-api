const joi = require('joi');
const { BlogPost, Category, User } = require('../models');

const verifyPostInfos = (postInfos) => (
  joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
    categoryIds: joi.array().required(),
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
    return ({ error: { statusCode: 400, message: 'Category not found' } });
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
  } catch (e) {
    return { error: e };
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
  } catch (e) {
    return { error: e };
  }
};

module.exports = {
  registerPostService,
  getAllPostsService,
  getPostByIdService,
};
