const { BlogPost, Categorie, User } = require('../models');
const blogpostController = require('../controller/blogpostController');

const createBlogpost = async (req, res, _next) => {
  const { title, content, categoryIds } = req.body; const { id: userId } = req.user;

  // BlogPost.create({ title, content, userId })
  //   .then((newBlogpost) => {
  //     const reply = blogpostController.createBlogpostOk(newBlogpost);
  //     res.status(reply.code).json(reply.blogpost);
  //   })
  //   .catch((e) => {
  //     const reply = blogpostController.createBlogpostError(e.parent.sqlMessage)
  //     res.status(reply.code).send({ message: reply.phrase })
  //   })

  try {
    const categorieList = await Categorie.findAll({ where: { id: categoryIds } });
    if (!categorieList.length) { throw categorieList; } 
    const blogPost = await BlogPost.create({ title, content, userId });

    // categoryIds.forEach(async (catId) => { 
    //   await PostsCategorie.create({
    //     postId: blogPost.dataValues.id, categoryId: catId }, { fields: ['postId', 'categoryId'] }); 
    // });       // toquei pra versao da documentação depois que descobri o erro o tabnine

    await blogPost.addCategories(categorieList);

    // cria um blogpost com sucesso mudei o nome da funçao e coloquei em uma linha por causa do lint
    const r = blogpostController.createBpOk(blogPost); return res.status(r.code).json(r.blogpost);
  } catch (error) {
    if (error.length === 0) {
      const reply = blogpostController.createBlogpostError(error);
      return res.status(reply.code).send({ message: reply.phrase });
    }
    const reply = blogpostController.createBlogpostError(error.message);
    res.status(reply.code).send({ message: reply.phrase });
  }
};

const showAllBlogPost = async (req, res, _next) => {
  const blogPostList = await BlogPost.findAll({ 
    attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  }); 

  const reply = blogpostController.showAllBlogPostOk(blogPostList);
  res.status(reply.code).send(reply.blogpost);
};

module.exports = {
  createBlogpost,
  showAllBlogPost,
};
