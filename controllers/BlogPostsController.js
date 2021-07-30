const BlogPostsServices = require('../services/BlogPostsServices');

const getAll = async (_req, res) => {
    try {
        const posts = await BlogPostsServices.getAll();
        return res.status(200).json(posts);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Ocorreu um erro' });
    }
};

module.exports = { getAll };