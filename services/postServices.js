const { Category, BlogPost, User, PostCategory } = require('../models');

const postTitleAndContentVerification = (newPost) => {
  const { title, content } = newPost;
  const titleError = { status: 400, message: '"title" is required' };
  if (!title) throw titleError;
  const contentError = { status: 400, message: '"content" is required' };
  if (!content) throw contentError;
};

const postCategoryIdsVerification = async (newPost) => {
  const { categoryIds } = newPost;
  const categoryIdsError = { status: 400, message: '"categoryIds" is required' };
  if (!categoryIds) throw categoryIdsError;
  const compatibleIds = await Category.findAll({ where: { id: categoryIds } });
  const compatibleIdsError = { status: 400, message: '"categoryIds" not found' };
  if (compatibleIds.length !== categoryIds.length) throw compatibleIdsError;
};

const createNewPost = async (newPost, email) => {
  postTitleAndContentVerification(newPost);
  await postCategoryIdsVerification(newPost);
  const { title, content, categoryIds } = newPost;
  const userObject = await User.findOne({ where: { email } });
  const userId = userObject.dataValues.id;
  const createdPost = await BlogPost.create({
    title,
    content,
    userId,
  });
  await categoryIds.forEach((catId) => {
    PostCategory.create({
      postId: createdPost.id,
      categoryId: catId,
    });
  });

  // a partir da associaçao correta, dá pra usar o método do sequelize diretamente:
  // await createdPost.addCategories(categoryIds);

  return createdPost;
};

module.exports = {
  createNewPost,
};
