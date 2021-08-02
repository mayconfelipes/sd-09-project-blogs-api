const { User, BlogPost, PostCategory, Category } = require('../models');

const validateTitle = (title) => {
  const error = { status: 400, message: '"title" is required' };
  if (!title) throw error;
};

const validateContent = (content) => {
  const error = { status: 400, message: '"content" is required' };
  if (!content) throw error;
};

const validateCategoryIds = async (ids) => {
  const error = { status: 400, message: '"categoryIds" is required' };
  if (!ids) throw error;
  const categoryCheck = ids.map(async (id) => Category.findByPk(id));
  const promiseResolve = await Promise.all(categoryCheck);
  const notFound = { status: 400, message: '"categoryIds" not found' };
  if (promiseResolve.includes(null)) throw notFound;
};

const create = async (post, userInfo) => {
  const { title, content, categoryIds } = post;
  validateTitle(title);
  validateContent(content);
  await validateCategoryIds(categoryIds);
  const userId = await User.findOne({ attributes: ['id'], where: { email: userInfo } });
  const newPost = await BlogPost.create({ title, content, userId: userId.dataValues.id });
  await categoryIds
    .forEach((cat) => PostCategory.create({ postId: newPost.dataValues.id, categoryId: cat }));
  const postSchema = {
    id: newPost.dataValues.id,
    userId: userId.dataValues.id,
    title: newPost.dataValues.title,
    content: newPost.dataValues.content,
  };
  return postSchema;
};

module.exports = {
  create,
};
