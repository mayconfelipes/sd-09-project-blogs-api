const { BlogPost } = require('../models/index');

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

module.exports = {
  postBlogPosts,
};
