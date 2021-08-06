const postServices = require('../services/postServices');

const getAllPosts = (_req, res) => postServices.getAllPosts()
  .then(({ status, data }) => res.status(status).json({ users: data }));

const getPostById = (req, res) => postServices.getPostById(req.params.id)
  .then(({ status, data }) => res.status(status).json(data));

module.exports = { getAllPosts, getPostById };