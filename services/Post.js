const boom = require('@hapi/boom');
const { User, BlogPosts, Categories, PostsCategories } = require('../models');

const post = async (postItem, user) => {
  const { title, content, categoryIds } = postItem;

  const result = await Categories.findAll();
  const idResult = result.map((item) => item.id);
  const verifyResult = categoryIds.every((id) => idResult.includes(id));
  if (!verifyResult) {
    throw boom.badRequest('"categoryIds" not found');
  }
  
  const { id } = await User.findOne({ where: { email: user } });
  const createPost = await BlogPosts.create({ title, content, userId: id });

  await categoryIds.forEach((catId) => PostsCategories.create(
    { categoryId: catId, postId: createPost.id },
));

  return createPost;
};

const findAll = async () => {
  const allPost = await BlogPosts.findAll({ include: ['user', 'categories'] });
  return allPost;
};

const findById = async (id) => {
  const idPost = await BlogPosts.findOne({ where: { id }, include: ['user', 'categories'] });
  if (!idPost) throw boom.notFound('Post does not exist');
  return idPost;
};

const putById = async (id, { title, content }, { email }) => {
  const verifyIdUser = await User.findOne({ where: { email } });
  const verifyId = await findById(id);
  if (verifyIdUser.id !== verifyId.userId) { throw boom.unauthorized('Unauthorized user'); }

  await BlogPosts.update({ title, content }, { where: { id } }); 
const postEdited = await findById(id);
return postEdited;
};
const deletePostById = async (id, { email }) => {
  const verifyId = await findById(id);
  const verifyIdUser = await User.findOne({ where: { email } });
  if (verifyIdUser.id !== verifyId.userId) { throw boom.unauthorized('Unauthorized user'); }

  const deletePost = await BlogPosts.destroy({ where: { id } });
  return deletePost;
};

module.exports = { post, findAll, findById, putById, deletePostById };