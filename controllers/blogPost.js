const { Router } = require('express');

const blogPostRouter = Router();

const service = require('../services');
const { BlogPost, PostsCategories, Category, User } = require('../models');
const { status, message } = require('../services/statusMessages');

// blogPostRouter.get('/:id', service.auth, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await BlogPost.findByPk(id);
//   res.status(status.OK).json(result);
//   } catch (error) {
//       res.status(status.SERVER_ERROR).json(message.serverError);
//   }
// });

// blogPostRouter.get('/', service.auth, async (req, res) => {
//   try {
//     const result = await BlogPost.findAll();
//   res.status(status.OK).json(result);
//   } catch (error) {
//       res.status(status.SERVER_ERROR).json(message.serverError);
//   }
// });

blogPostRouter.post('/', service.auth, service.blogPostCheckFields,
  service.blogPostCheckCategory, async (req, res) => {
    try {
      const { id: userId } = req.user;
      const { title, content, categoryIds } = req.body;
      // console.log(userId, title, content, categoryIds);
      const addPost = await BlogPost.create(
        { title, content, userId, published: new Date(), updated: new Date() },
      );
      
      await categoryIds.forEach(async (elId) => {
        await PostsCategories.create({ categoryId: elId, postId: addPost.id });
      });

      res.status(status.CREATED).json(addPost);
    } catch (error) {
        res.status(status.SERVER_ERROR).json(message.serverError);
    }
});

blogPostRouter.get('/:id', service.auth,
  async (req, res) => {
    const { id } = req.params;
    try {
      // teste 1
      // const result = await BlogPost.findByPk(id);

      // teste 2
      // const result = await BlogPost.findByPk(id, {
      //   include: { model: User, as: 'user' } });

      // teste 3
      // const result = await BlogPost.findByPk(id, {
      //   include: { model: Category, as: 'categories' } });
      
      // teste 4
      const result = await BlogPost.findByPk(id, {
        include: [
          { model: User, as: 'user' },
          { model: Category, as: 'categories' },
        ],
      });
      console.log('Ponto 0.1');
      console.log(result);
      if (result === null) {
        res.status(status.NOT_FOUND).json(message.postIdNotExist);
      }
      return res.status(status.OK).json(result);
    } catch (error) {
        res.status(status.SERVER_ERROR).json(message.serverError);
    }
});

blogPostRouter.get('/', service.auth, async (req, res) => {
  try {
    const result = await BlogPost.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories' },
      ],
    });
    return res.status(status.OK).json(result);
  } catch (error) {
      res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

module.exports = blogPostRouter;