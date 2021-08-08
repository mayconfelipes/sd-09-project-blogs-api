const { BlogPosts, Categories, User } = require('../../../models');

const savePost = async (post) => {
  try {
    const newPost = await BlogPosts.create(post);
    return newPost;
  } catch (error) {
    return { error: true, code: 500, message: error };
  }
};

const getUserByField = async (field, value) => {
  try {
    const user = await BlogPosts.findOne({ 
      where: { [field]: value },
      include: [
        { model: User, as: 'user' },
        { model: Categories, as: 'categories', through: { attributes: [] } },
      ],
    });
    return user;
  } catch (error) {
    return { error: true, code: 500, message: error };
  }
};

const getAll = async () => {
  try {
    const posts = await BlogPosts.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Categories, as: 'categories', through: { attributes: [] } },
      ],
    });
    return posts;
  } catch (error) {
    console.log(error);
    return { error: true, code: 500, message: error };
  }
};

const getPostByPk = async (id) => {
  try {
    const post = await BlogPosts.findByPk(id);
    return post;
  } catch (error) {
    return { error: true, code: 500, message: error };
  }
};

const update = async (post, id) => {
  try {
    const [newPost] = await BlogPosts.update(
      { ...post },
      { where: { id } },
    );
    return newPost;
  } catch (error) {
    return { error: true, code: 500, message: error };
  }
};

const deletePost = async (id) => {
  try {
    const deleted = await BlogPosts.destroy({ where: { id } });
    return deleted;
  } catch (error) {
    return { error: true, code: 500, message: error };
  }
};

const getUserByQuery = async (filters) => {
  try {
    const posts = await BlogPosts.findAll({
      where: filters,
      include: [
        { model: User, as: 'user' },
        { model: Categories, as: 'categories', through: { attributes: [] } },
      ],
    });
    return posts;
  } catch (error) {
    return { error: true, code: 500, message: error };
  }
};

module.exports = {
  savePost,
  getUserByField,
  getAll,
  getPostByPk,
  update,
  deletePost,
  getUserByQuery,
};
