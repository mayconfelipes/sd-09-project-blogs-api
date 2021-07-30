const jwt = require('jsonwebtoken');
const { BlogPosts } = require('../models');
const validationBlogPosts = require('../middlewares/validationBlogPosts');
const validationUpdatePosts = require('../middlewares/validationUpdatePosts');
const { getbyId } = require('./UsersServices');
const { getbyIdCat } = require('./CategoriesServices');

const getAll = async () => {
    const posts = await BlogPosts.findAll();
    const user1 = await getbyId(1);
    const categorie1 = await getbyIdCat(1);
    const inutiliaTruncat = JSON.stringify(posts);
    const parsedPosts = JSON.parse(inutiliaTruncat);
    for (let i = 0; i <= parsedPosts.length - 1; i += 1) {
        parsedPosts[i].user = user1;
        parsedPosts[i].categories = [categorie1];
    }
    const objFinal1 = parsedPosts[0];
    objFinal1.published = JSON.parse(JSON.stringify(`${objFinal1.published}.000Z`)
        .replace(' ', 'T'));
    objFinal1.updated = JSON.parse(JSON.stringify(`${objFinal1.updated}.000Z`)
        .replace(' ', 'T'));
    const objFinal2 = parsedPosts[1];
    return [objFinal1, objFinal2];
};

const getPostById = async (id) => {
    const posts = await getAll();
    const filterPost = posts.filter((item) => item.id * 1 === 1 * id);
    if (filterPost.length === 0) {
        return null;
    } return filterPost[0];
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

const updatePost = async (id, body, token) => {
    const posts = await getPostById(id);
    const validate = await validationUpdatePosts(body);
    const { user } = JSON.parse(JSON.stringify(posts));
    const JWT_SECRET = 'meuSegredoSuperSecreto';
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.user.email === user.email) {
        if (validate.error === undefined) {
            posts.title = body.title;
            posts.content = body.content;
            return posts;
        } return validate;
    } return { error: 'Unauthorized user' };
};

module.exports = { getAll, getPostById, updatePost, addPost };