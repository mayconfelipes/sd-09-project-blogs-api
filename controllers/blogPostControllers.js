const BlogPost = require('../services/blogPostService');

const addPost = async (req, res) => {
  const postData = req.body;
  const { id } = req.user;
  try {
    const post = await BlogPost.addPost(postData, id);
    if (post.error) {
      return res.status(post.error.code).json({ message: post.error.message });
    }
    return res.status(201).json(post);
  } catch (error) {
    console.log('Deu ruim');
    res.status(500).json({ message: 'Internal Error', error });
  }
};

const getAllPosts = async (req, res) => {
  const posts = await BlogPost.getAllPosts();
  return res.status(200).json(posts);
};

module.exports = {
  addPost,
  getAllPosts,
};