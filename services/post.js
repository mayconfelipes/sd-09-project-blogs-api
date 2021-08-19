const { Op } = require('sequelize');
const { User, BlogPost, PostCategory, Category } = require('../models');

const createPost = async (postData, id) => {
  const { title, content, categoryIds } = postData;
  const categories = [];
  let error = false;

  categoryIds.forEach((cat) => categories.push(Category.findByPk(cat)));

  const categoryList = await Promise.all(categories);

  categoryList.forEach((cat) => {
    if (!cat) error = true;
  });

  if (error) return { message: '"categoryIds" not found', statusCode: 400 };

  const newPost = await BlogPost.create(
    { title, content, userId: id, published: Date.now(), updated: Date.now() },
  );

  categoryIds.forEach((categoryId) => {
    PostCategory.create({ postId: newPost.id, categoryId });
  }); 

  return newPost;
};

const readPosts = () => BlogPost.findAll({
  include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const readPost = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) return { message: 'Post does not exist', statusCode: 404 };

  return post;
};

const updatePost = async (postData, postId, userId) => {
  const post = await BlogPost.findByPk(postId, {
    include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
  });

  if (!post) return { message: 'Post does not exist', statusCode: 404 };

  if (post.userId !== userId) return { message: 'Unauthorized user', statusCode: 401 };

  await BlogPost.update(postData, { where: { id: postId } });

  return BlogPost.findByPk(postId, {
    include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
  });
};

const deletePost = async (postId, userId) => {
  const post = await BlogPost.findByPk(postId);

  if (!post) return { message: 'Post does not exist', statusCode: 404 };

  if (post.userId !== userId) return { message: 'Unauthorized user', statusCode: 401 };

  return BlogPost.destroy({ where: { id: postId } });
};

const searchPosts = async (query) => {
  if (!query) return readPosts();

  return BlogPost.findAll({
    where: {
      [Op.or]: [
      { title: { [Op.like]: `%${query}%` } },
      { content: { [Op.like]: `%${query}%` } },
    ],
  },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
};

module.exports = {
  createPost,
  readPosts,
  readPost,
  updatePost,
  deletePost,
  searchPosts,
};
