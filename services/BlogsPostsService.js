require('dotenv/config');
const jwt = require('jsonwebtoken');

const { Category, BlogPost, User } = require('../models/index.js');

const isValidPost = (title, content, categoryIds) => {
    if (!title) throw new Error('"title" is required');
    if (!content) throw new Error('"content" is required');
    if (!categoryIds) throw new Error('"categoryIds" is required');
    return undefined;
};

const isValidCategory = async (categoryIds) => {
  const categoryAlreadyExists = await Category.findAll();
  const categoriesIds = categoryAlreadyExists.map((category) => category.id);
  const isValidId = categoryIds.every((id) => categoriesIds.includes(id));
  return isValidId;
  };

const addPost = async (title, content, categoryIds, email) => {
  const postIsNotValid = isValidPost(title, content, categoryIds);
  if (postIsNotValid) throw new Error(postIsNotValid);
  const isValidId = await isValidCategory(categoryIds);
  if (!isValidId) throw new Error('"categoryIds" not found');
  const { id: userId } = await User.findOne({ where: { email } });
  const addedPost = await BlogPost.create({
      userId,
      title,
      content,
      categoryIds,
      published: new Date(),
      updated: new Date() });
  return addedPost;
};

const getAllBlogPosts = async () => {
  const result = await BlogPost.findAll({ 
      include: [
    { model: User, as: 'user', attributes: { excludes: ['password'] } },
    { model: Category, as: 'categories' },
  ],
});
  return result;
};

const userCanEdit = async (post, email) => {
  const { userId } = post;
  const user = await User.findOne({ where: { email } });
  if (user.id !== userId) throw new Error('Unauthorized user');
};

const editPost = (post) => {
  if (!post.title) throw new Error('"title" is required');
  if (!post.content) throw new Error('"content" is required');
  if (!Object.keys(post).every((elem) => elem === 'title' || elem === 'content')) {
    throw new Error('Categories cannot be edited');
  }
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { excludes: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
    if (!post) {
    return undefined;
    }
    return post;
};

const editPostById = async (id, post, token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { email } = decoded;
  const postToEdit = await getPostById(id);

  editPost(post);
  await userCanEdit(postToEdit.dataValues, email);
};

const deletePost = async (id, token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { email } = decoded;
  const postToDelete = await getPostById(id);
  
  if (!postToDelete) throw new Error('Post does not exist');

  await userCanEdit(postToDelete.dataValues, email);

  await BlogPost.destroy({ where: { id } });
};

const deleteUser = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { email } = decoded;
  const { id } = await User.findOne({ where: { email } });
  await User.destroy({ where: { id } });
};

module.exports = {
    addPost,
    isValidCategory,
    getAllBlogPosts,
    userCanEdit,
    editPost,
    deletePost,
    editPostById,
    getPostById,
    deleteUser,
};