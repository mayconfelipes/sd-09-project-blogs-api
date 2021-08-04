const { PostsCategories } = require('../models');

const getAllPosts = async () => {
    const posts = await PostsCategories.findAll();
    return posts;
};

module.exports = { getAllPosts };