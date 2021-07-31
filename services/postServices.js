const { postSchema, joiError, validateError, updatePostSchema } = require('../schemas');
const { Category, BlogPost, PostsCategory, User } = require('../models');

const validateCategories = async (categoryIds) => {
  const categories = await categoryIds.map((id) => Category.findOne({ where: { id } }));
  const promise = await Promise.all(categories);
  const result = promise.find((value) => value === null);
  if (result === null) return { message: '"categoryIds" not found' };

  return {};
};

const createPost = async (body, userId) => {
  const { categoryIds } = body;
  const { error } = postSchema.validate(body);
  if (error) throw joiError(400, error);
  const validate = await validateCategories(categoryIds);
  if (validate.message) throw validateError(400, validate.message);

  const { title, content } = body;
  const newPost = await BlogPost.create({ title, content, userId });
  console.log('criou post');
  const { dataValues } = newPost;
  categoryIds.map((categoryId) => PostsCategory.create({ categoryId, postId: newPost.null }));

  return {
    id: newPost.null,
    userId: dataValues.userId,
    title: dataValues.title,
    content: dataValues.content,
  };
};

const updatePostById = async (body, id, userId) => {
  const { title, content, categoryIds } = body;
  if (categoryIds) throw validateError(400, 'Categories cannot be edited');
  const { error } = updatePostSchema.validate(body);
  if (error) throw joiError(400, error);
  const [post] = await BlogPost.findAll({ where: { id }, 
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', attributes: ['id', 'name'] }] });
  if (!post) throw validateError(404, 'Post does not exist');
  if (post.userId !== userId) throw validateError(401, 'Unauthorized user');
  BlogPost.update({ title, content }, {
    where: { id },
  });
  post.title = title;
  post.content = content;

  return post;
};

const deletePostById = async (id, userId) => {
  const [post] = await BlogPost.findAll({ where: { id }, 
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', attributes: ['id', 'name'] }] });
  if (!post) throw validateError(404, 'Post does not exist');
  if (post.userId !== userId) throw validateError(401, 'Unauthorized user');

  BlogPost.destroy({
    where: { id },
  });
  return {};
};

module.exports = {
  createPost,
  updatePostById,
  deletePostById,
};