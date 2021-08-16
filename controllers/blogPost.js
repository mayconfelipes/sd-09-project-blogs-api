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

  const getPostById = async (req, res) => {
    try {
      const { id } = req.params;
      const blogPost = await BlogPost.findOne({
        where: { id },
        include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories' },
      ] });
      if (!blogPost) { 
        return res.status(404).json({ message: 'Post does not exist' }); 
      } return res.status(200).json(blogPost);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };
module.exports = {
  postBlogPosts,
  getAllPosts,
  getPostById,
};
