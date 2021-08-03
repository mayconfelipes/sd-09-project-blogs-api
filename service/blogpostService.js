const { BlogPost } = require('../models');

const createBlogpost = (req, res, _next) => {
  const { title, content, userId } = req.body;
  console.table('++++++++++++', req)
  // plano pra quando acordar .... pegar id do usario pelo token .. e tratar ids de categoria
  BlogPost.create({ title, content, userId })
    .then((newBlogpost) => {

      res.status(350).json(newBlogpost)
    })
    .catch((e) => {

      res.status(700).send({ message: e})
    })
}

module.exports = {
  createBlogpost,
};