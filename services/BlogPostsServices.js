const jwt = require('jsonwebtoken');
const { BlogPosts, Categories, Users } = require('../models');
const validationBlogPosts = require('../middlewares/validationBlogPosts');
const validationUpdatePosts = require('../middlewares/validationUpdatePosts');
const { findByEmail } = require('./UsersServices');
// const { getAllPosts } = require('./PostsCategoriesServices');

// const { getbyIdCat } = require('./CategoriesServices');

const verifyToken = (token) => {
    const JWT_SECRET = 'meuSegredoSuperSecreto';
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
};

const normalizeObj = (obj) => JSON.parse(JSON.stringify(obj));

// const getParams = async () => {
//     const findPostsAndCategories = await getAllPosts();
//     const postsWithCategories = normalizeObj(findPostsAndCategories);
//     const findPoster = await BlogPosts.findAll();
//     const posts = normalizeObj(findPoster);
//     const findUser = await getbyId(posts[0].userId);
//     const user = normalizeObj(findUser);
//     return 
// }
// const getAll = async () => {
//     const findPostsAndCategories = await getAllPosts();
//     const postsWithCategories = normalizeObj(findPostsAndCategories);
//     const findPoster = await BlogPosts.findAll();
//     const posts = normalizeObj(findPoster);
//     // for ( let i = 0 ; i < posts.length ; i += 1)
//     const findUser = await getbyId(posts[0].userId);
//     const user = normalizeObj(findUser);
// };

//  consultei o repositorio de meu colega para refatoração desta função
//  https://github1s.com/tryber/sd-09-project-blogs-api/pull/34/commits/13d13089ff008ddfd3b9bd6cc9e41e24fa965abf
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

async function getAllBlogPosts() {
    const posts = await BlogPosts.findAll({
      include: [
        { attributes: ['id', 'displayName', 'email', 'image'], model: Users, as: 'user' },
        { model: Categories, as: 'categories' },
      ],
    });
    return posts;
  }

const deletPost = async (id) => {
    const post = await BlogPosts.destroy({ where: { id } });
    return post;
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
    const JWT_SECRET = 'meuSegredoSuperSecreto';
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.user.email === user.email) {
        if (!validate.message) {
            posts.title = body.title;
            posts.content = body.content;
            return posts;
        } return validate;
    } return { message: 'Unauthorized user' };
};

module.exports = { getAllBlogPosts, deletPost, getPostById, updatePost, addPost };