const jwt = require('jsonwebtoken');
const { validateEmail: getByEmail } = require('./userService');
const { BlogPosts, Users, Categories } = require('../models');
const validatePosts = require('../middlewares/validatePosts');

function verifytoken(token) {
  const secret = 'trybe-t9';
  const payload = jwt.verify(token, secret);
  return payload;
}

// tive ajudar do aluno adrina na explicação
// https://github.com/adrianoforcellini
const normalizeObj = (obj) => JSON.parse(JSON.stringify(obj));

const createPost = async (bodyReq, token) => {
  const payload = verifytoken(token);
  const user = await getByEmail(payload.result.email);
  const normalizeUser = normalizeObj(user);
  const validatePost = validatePosts(bodyReq);
  if (!validatePost.message) {
    const newBody = bodyReq;
    // esta transformando obj
    newBody.userId = normalizeUser.id;
   
    const result = await BlogPosts.create(bodyReq);
    return result;
  }
  return validatePost;
};

// consultei o repositorio do meu colega lucio
// https://github.com/tryber/sd-09-project-blogs-api/pull/34/
const getAll = async () => {
  const result = await BlogPosts.findAll({
    include: [
      { attributes: ['id', 'displayName', 'email', 'image'], model: Users, as: 'user' },
      { model: Categories, as: 'categories' },
    ],
  });
  return result;
};

// consultei o repositorio do meu colega lucio
// https://github.com/tryber/sd-09-project-blogs-api/pull/34/
const getById = async (id) => {
  const result = await BlogPosts.findOne({
    where: { id },
    include: [
        { attributes: ['id', 'displayName', 'email', 'image'], model: Users, as: 'user' },
        { model: Categories, as: 'categories' },
    ],
});
return result;
};

module.exports = {
  createPost,
  getAll,
  getById,
};