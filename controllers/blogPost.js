const { BlogPost, User, Category } = require('../models/index');

const postBlogPosts = async (req, res) => {
  try {
    const { content, title } = req.body;
    const blogPost = await BlogPost.create({ content, title, userId: req.user });
    return res.status(201).json(blogPost);
} catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const allPosts = await BlogPost.findAll({ include:
      [{ model: User, as: 'user', attributes: { exclude: ['password'] } },  
       { model: Category, as: 'categories', through: { attributes: [] } }] });
    return res.status(200).json(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
  };

module.exports = {
  postBlogPosts,
  getAllPosts,
};
