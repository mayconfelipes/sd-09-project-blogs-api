const categoryService = require('./categoryService');
const userService = require('./userService');
const postsCategoryService = require('./postsCategoryService');
const { BlogPosts } = require('../models');
const { Users } = require('../models');
const { Categories } = require('../models');
const { updatePostSchema } = require('../schemas');
const { postSchema } = require('../schemas');

const createPost = async (payload) => {
  const { userEmail, title, content, categoryIds } = payload;

  const postValidation = postSchema.validate({ title, content, categoryIds });

  if (postValidation.error) return postValidation;

  const verifyCategories = await categoryService.getCategoriesByPk(categoryIds);

  if (!verifyCategories.length) {
    return { error: true, statusCode: 400, message: '"categoryIds" not found' };
  }

  const getUser = await userService.getUserByEmail(userEmail);

  const { id: userId } = getUser;

  const newPost = await BlogPosts.create({ userId, title, content });

  const { id: postId, dataValues } = newPost;

  delete dataValues.published;
  delete dataValues.updated;

  await postsCategoryService.insertPostAndCategoryIds(categoryIds, postId);

  return dataValues;
};

const getAllPosts = async () =>
  BlogPosts.findAll({
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories' },
    ],
  });

const getPostById = async (id) => {
  const post = await BlogPosts.findOne({
    where: { id },
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories' },
    ],
  });

  return (
    post || {
      statusCode: 404,
      error: true,
      message: 'Post does not exist',
    }
  );
};

const isPostAuthor = async (userEmail, postId) => {
  const author = await userService.getUserByEmail(userEmail);

  const post = await getPostById(postId);
  return author.id === post.userId;
};

const updatePost = async (id, reqBody, userEmail) => {
  if (!(await isPostAuthor(userEmail, id))) {
    return { statusCode: 401, error: true, message: 'Unauthorized user' };
  }

  const postValidation = updatePostSchema.validate(reqBody);

  if (postValidation.error) return postValidation;

  await BlogPosts.update(
    {
      title: reqBody.title,
      content: reqBody.content,
    },
    { where: { id } },
  );

  const updatedPost = await BlogPosts.findOne({
    where: { id },
    include: [{ model: Categories, as: 'categories' }],
  });
  return updatedPost;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};
