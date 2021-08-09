const blogServices = require('../services/blogServices');

async function addPost(req, res) {
  const { title, content, categoryIds } = req.body;
  const { authorization: token } = req.headers;
  const { status, response } = await blogServices.addPost(title, content, categoryIds, token);
  return res.status(status).json(response);
}

async function getPosts(req, res) {
  const { authorization: token } = req.headers;
  const { status, response } = await blogServices.getPosts(token);
  return res.status(status).json(response);
}

module.exports = {
  addPost,
  getPosts,
};
