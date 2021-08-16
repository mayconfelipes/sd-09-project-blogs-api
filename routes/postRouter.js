const express = require('express');
const { 
  tokenValidation,
  checkTitleAndContentPost,
  checkCategoryId,
  checkPostUserId, 
  blockCategoriesFromBeingEdited,
  checkIfPostExist } = require('../middlewares');

const { BlogPost, User, Category } = require('../models/index');

const postRouter = express.Router();

postRouter.post('/',
  checkCategoryId,
  tokenValidation,
  checkTitleAndContentPost,
  (req, res) => {
    const { content, title } = req.body;
    
    BlogPost.create({ title, content, userId: req.user })
      .then((postInfo) => res.status(201).send(postInfo.dataValues));
});

postRouter.get('/', 
  tokenValidation,
  async (_req, res) => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
  });
  return res.status(200).send(allPosts);
});

postRouter.get('/:id', 
  tokenValidation,
  checkIfPostExist,
  async (req, res) => {
  const { id } = req.params;
  const getPostById = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
  });
  return res.status(200).send(getPostById);
});

postRouter.put('/:id', 
  tokenValidation,
  checkPostUserId,
  checkTitleAndContentPost,
  blockCategoriesFromBeingEdited,
  async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  BlogPost.update({ title, content }, { where: { id } })
    .then(async () => { 
     const postUpdated = await BlogPost.findOne({ 
       where: { id },
       include: [
        { model: Category, as: 'categories' },
      ] });
     return res.status(200).send(postUpdated); 
    })
    .catch((e) => res.status(400).send({ Error: e.message }));
});

postRouter.delete('/:id',
  tokenValidation,
  checkIfPostExist,
  checkPostUserId,
  async (req, res) => {
    const { id } = req.params;
    await BlogPost.destroy({ where: { id } })
    .then(() => res.status(204).send())
    .catch((e) => res.status(400).send({ Error: e.message }));
  });

module.exports = postRouter;