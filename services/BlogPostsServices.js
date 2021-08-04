const jwt = require('jsonwebtoken');
const { BlogPosts, Categories, Users } = require('../models');
const validationBlogPosts = require('../middlewares/validationBlogPosts');
const validationUpdatePosts = require('../middlewares/validationUpdatePosts');
const { findByEmail } = require('./UsersServices');

const verifyToken = (token) => {
    const JWT_SECRET = 'meuSegredoSuperSecreto';
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
};

const normalizeObj = (obj) => JSON.parse(JSON.stringify(obj));

// refatoração realizada após o estudo do pull requeste:
//  https://github.com/tryber/sd-09-project-blogs-api/pulls/34
const getPostById = async (id) => {
    const post = await BlogPosts.findOne({
        where: { id },
        include: [
            { attributes: ['id', 'displayName', 'email', 'image'], model: Users, as: 'user' },
            { model: Categories, as: 'categories' },
        ],
    });
    return post;
};

// refatoração realizada após o estudo do pull requeste:
//  https://github.com/tryber/sd-09-project-blogs-api/pulls/34
async function getAllBlogPosts() {
    const posts = await BlogPosts.findAll({
        include: [
            { attributes: ['id', 'displayName', 'email', 'image'], model: Users, as: 'user' },
            { model: Categories, as: 'categories' },
        ],
    });
    return posts;
}

const deletPost = async (id, token) => {
    const payload = verifyToken(token);
    const findyUserLogged = await findByEmail(payload.user.email);
    const normalizefindyUserLogged = normalizeObj(findyUserLogged);
    const userLoggedId = normalizefindyUserLogged.id;

    const findPost = await BlogPosts.findOne({ where: { id } });
    if (findPost) {
        const normalizefindPost = normalizeObj(findPost);
        if (userLoggedId === normalizefindPost.userId) {
            const post = await BlogPosts.destroy({ where: { id } });
            return post;
        } return { message: 'Unauthorized user' };
    }
    return 'null';
};

const addPost = async (body, token) => {
    const payload = verifyToken(token);
    const validate = await validationBlogPosts(body);
    const findyUser = await findByEmail(payload.user.email);
    const user = normalizeObj(findyUser);
    const { message } = validate;
    if (!message && user) {
        const obj = body;
        obj.userId = user.id;
        const blogPost = await BlogPosts.create(obj);
        return blogPost;
    }
    return { message };
};

const updatePost = async (id, body, token) => {
    const posts = await getPostById(id);
    const validate = await validationUpdatePosts(body);
    const { user } = JSON.parse(JSON.stringify(posts));
    const payload = verifyToken(token);
    if (payload.user.email === user.email) {
        if (!validate.message) {
            posts.title = body.title;
            posts.content = body.content;
            return posts;
        } return validate;
    } return { message: 'Unauthorized user' };
};

module.exports = { getAllBlogPosts, deletPost, getPostById, updatePost, addPost };