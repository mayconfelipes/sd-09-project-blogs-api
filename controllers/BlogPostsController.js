const BlogPostsServices = require('../services/BlogPostsServices');
// const UsersServices = require('../services/UsersServices');
// const CategoriesServices = require('../services/CategoriesServices');

const getAll = async (req, res) => {
    const posts = await BlogPostsServices.getAllBlogPosts();
    return res.status(200).json(posts);
};

const deletPost = async (req, res) => {
    const { id } = req.params;
    const post = await BlogPostsServices.deletPost(id);
    if (post === 1) {
        return res.status(204).json(post);
    }
    return res.status(401).json({ message: 'Post does not exist' });
};

const getPostById = async (req, res) => {
    const { id } = req.params;
    const post = await BlogPostsServices.getPostById(id);
    if (post) {
        return res.status(200).send(post);
    }
    return res.status(404).json({ message: 'Post does not exist' });
};

const addPost = async (req, res) => {
    const token = req.headers.authorization;
    const post = await BlogPostsServices.addPost(req.body, token);
    if (!post.message) {
        const { id, userId, title, content } = post;
        const output = { id, userId, title, content };
        return res.status(201).json(output);
    }
    if (post.message.includes('one of [1, 2]')) {
        return res.status(400).json({ message: '"categoryIds" not found' });
    }
    return res.status(400).json(post);
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const token = req.headers.authorization;
    const post = await BlogPostsServices.updatePost(id, body, token);
    const { message } = post;
    if (!message) {
        return res.status(200).json(post);
    } if (message === '"categoryIds" is not allowed') {
        return res.status(400).json({ message: 'Categories cannot be edited' });
    } if (message === 'Unauthorized user') {
        return res.status(401).json({ message });
    }
    return res.status(400).json({ message });
};

module.exports = { getAll, deletPost, addPost, updatePost, getPostById };