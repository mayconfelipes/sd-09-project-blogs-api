const BlogPostsServices = require('../services/BlogPostsServices');

const getAll = async (_req, res) => {
    try {
        const posts = await BlogPostsServices.getAll();
        return res.status(200).json(posts);
    } catch (e) {
        res.status(500).json({ message: 'Ocorreu um erro' });
    }
};

const getPostById = async (req, res) => {
    const { id } = req.params;
    const posts = await BlogPostsServices.getPostById(id);
    if (posts !== null) {
        return res.status(200).json(posts);
    }
    return res.status(404).json({ message: 'Post does not exist' });
};

const addPost = async (req, res) => {
    const post = await BlogPostsServices.addPost(req.body);
    if (post.message === undefined) {
        return res.status(201).json(post);
    }
    if (post.message === '"0" must be one of [1, 2]') {
        return res.status(400).json({ message: '"categoryIds" not found' });
    }
    return res.status(400).json(post);
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const token = req.headers.authorization;
    const post = await BlogPostsServices.updatePost(id, body, token);
    if (post.error === undefined) {
        return res.status(200).json(post);
    } if (post.error === '"categoryIds" is not allowed') {
        return res.status(400).json({ message: 'Categories cannot be edited' });
    } if (post.error === 'Unauthorized user') {
        return res.status(401).json({ message: post.error });
    }
    return res.status(400).json({ message: post.error });
};

module.exports = { getAll, addPost, updatePost, getPostById };