const posts = require('../services/posts.js');

const create = async (req, res) => {
  const { status, ...jsonResponse } = await posts.create(req);
  res.status(status).json(jsonResponse);
};

const getAll = async (req, res) => {
  const { status, postList } = await posts.getAll();
  console.log(postList);
  res.status(status).json(postList);
};

module.exports = { create, getAll };