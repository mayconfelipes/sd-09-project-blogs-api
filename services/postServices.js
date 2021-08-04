const jwt = require('jsonwebtoken');
const { validateEmail: getByEmail } = require('./userService');
const { BlogPosts } = require('../models');
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
  const date = new Date();
  const validatePost = validatePosts(bodyReq);
  if (!validatePost.message) {
    const newBody = bodyReq;
    // esta transformando obj
    newBody.userId = normalizeUser.id;
    newBody.published = JSON.stringify(date);
    newBody.updated = JSON.stringify(date);

    const result = await BlogPosts.create(bodyReq);
    return result;
  }
  return validatePost;
};

const getAll = async () => {
   const result = await BlogPosts.findAll();
   return result;
};
module.exports = {
  createPost,
  getAll,
};