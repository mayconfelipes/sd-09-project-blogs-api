const { BlogPost, Category, User } = require('../models');

const errorMessage = (code, message) => ({ error: { code, message } });

const createPost = async ({ title, content, categoryIds }) => {
  const categoryExistsResponse = categoryIds.map((id) => Category.findByPk(id));

  const categoryExists = await Promise.all(categoryExistsResponse);

  if (categoryExists.includes(null)) return errorMessage('badRequest', '"categoryIds" not found');

  await BlogPost.create({ title, content });

  const post = BlogPost.findOne({ where: { title, content } });

  return post;
};

const getAllPosts = () => BlogPost
  .findAll(
    {
      attributes: { include: ['published', 'updated'] },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    },
  );

const getPostById = async (id) => {
  const post = await BlogPost.findOne(
      {
        where: { id },
        attributes: { include: ['published', 'updated'] },
        include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      },
  );

  if (!post) return errorMessage('notFound', 'Post does not exist');

  return post;
};

const getUserId = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user.id;
};

const checkPostAuthor = async (id, email) => {
  const userId = await getUserId(email);

  const post = await BlogPost.findOne({ where: { id } });

  if (userId !== post.userId) return false;

  return true;
};

const editPost = async ({ title, content, categoryIds }, email, id) => {
  if (categoryIds) return errorMessage('badRequest', 'Categories cannot be edited');

  const correctAuthor = await checkPostAuthor(id, email);

  if (!correctAuthor) return errorMessage('unauthorized', 'Unauthorized user');

  await BlogPost.update({ title, content }, { where: { id } });

  const newPost = await BlogPost.findOne(
    {
      where: { id },
      include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
    },
  );

  return newPost;
};

const deletePost = async (email, id) => {
  const post = await BlogPost.findOne({ where: { id } });

  if (!post) return errorMessage('notFound', 'Post does not exist');

  const correctAuthor = await checkPostAuthor(id, email);

  if (!correctAuthor) return errorMessage('unauthorized', 'Unauthorized user');

  await BlogPost.destroy({ where: { id } });

  return {};
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
  deletePost,
};
