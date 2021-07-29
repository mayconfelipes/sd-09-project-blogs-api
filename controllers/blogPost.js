const { Router } = require('express');

const blogPostRouter = Router();

const service = require('../services');
const { status, message } = require('../services/statusMessages');
const { BlogPost, Category, User, PostsCategories } = require('../models');

// REQ09-Busca postagens pelo ID
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
      if (result === null) {
        return res.status(status.NOT_FOUND).json(message.postIdNotExist);
      }
      return res.status(status.OK).json(result);
    } catch (error) {
        return res.status(status.SERVER_ERROR).json(message.serverError);
    }
});

// REQ08-Busca postagens
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
      return res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

// REQ07 - Cria Postagem usando id do usuário logado
// blogPostRouter.post('/', service.auth, service.blogPostCheckFields,
//   service.blogPostCheckCategory, async (req, res) => {
//     try {
//       const { id: userId } = req.user;
//       const { title, content, categoryIds } = req.body;
//       // console.log(userId, title, content, categoryIds);
//       const addPost = await BlogPost.create(
//         { title, content, userId, published: new Date(), updated: new Date() },
//       );
      
//       await categoryIds.forEach(async (elId) => {
//         await PostsCategories.create({ categoryId: elId, postId: addPost.id });
//       });

//       return res.status(status.CREATED).json(addPost);
//     } catch (error) {
//         return res.status(status.SERVER_ERROR).json(message.serverError);
//     }
// });

module.exports = blogPostRouter;