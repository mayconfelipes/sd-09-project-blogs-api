const { BlogPosts } = require('../models');

const getAll = async () => {
    const posts = await BlogPosts.findAll();
    return posts;
};

module.exports = { getAll };