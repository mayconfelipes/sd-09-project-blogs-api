const { BlogPosts } = require('../models');
const validationBlogPosts = require('../middlewares/validationBlogPosts');

const getAll = async () => {
    const posts = await BlogPosts.findAll();
    return posts;
};

const addPost = async (body) => {
    const validate = validationBlogPosts(body);
    if (validate.error === undefined) {
        const categorie = await BlogPosts.create(body);
        return categorie;
    }
    return { message: validate.error };
};

module.exports = { getAll, addPost };