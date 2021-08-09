const postsServices = require('../services/posts');

const createPost = async (req, res, next) => {
  try {
    const response = await postsServices.createPost(req.body);
    res.status(201).json(response);
  } catch (e) {
    console.log(e, 'aqui');
    if (e.code === 'invalid_arguments') {
      next({ status: 400, msg: e.msg });
    }
  }
};

const listsPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await postsServices.listsPosts(id);
    res.status(200).json(response);
  } catch (e) {
    console.log(e, 'aqui');
    if (e.code === 'invalid_arguments') {
      next({ status: 400, msg: e.msg });
    }
  }
};

module.exports = {
  createPost,
  listsPosts,
};