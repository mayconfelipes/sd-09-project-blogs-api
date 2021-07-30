const { BlogPosts } = require('../models');
const validationBlogPosts = require('../middlewares/validationBlogPosts');

const getAll = async () => {
    const posts = await BlogPosts.findAll();
    return posts;
};

const addPost = async (body) => {
    const date = new Date();
    const validate = await validationBlogPosts(body);
    if (validate.error === undefined) {
        const obj = body;
        obj.userId = 1;
        obj.published = JSON.stringify(date);
        obj.updated = JSON.stringify(date);
        const categorie = await BlogPosts.create(obj);
        return categorie;
    }
    return { message: validate.error };
};

module.exports = { getAll, addPost };