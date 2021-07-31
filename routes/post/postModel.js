const { BlogPost, PostCategory, User, Category } = require('../../models');

const createPost = async ({ title, content, categoryIds }, userId) => {
  try {
    const postResult = await BlogPost.create({
      title,
      content,
      userId,
      published: Date.now(),
      updated: Date.now(),
    });
    const { updated, published, ...post } = postResult.dataValues;

    categoryIds.forEach(async (id) => {
      await PostCategory.create({ postId: post.id, categoryId: id });
    });
      
    return post;
  } catch (error) {
    console.log(error.message);
  }
};

const allPosts = async () => {
  try {
    const result = await BlogPost.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return result;
  } catch (error) {
    console.log('error');
  }
};

const findPostById = async (id) => {
  try {
    const result = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (id, { title, content }) => {
  try {
    await BlogPost.update(
      { title, content, updated: Date.now() },
      { where: { id } },
    );
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (id) => {
  try {
    await BlogPost.destroy({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createPost,
  allPosts,
  findPostById,
  updatePost,
  deletePost,
};
