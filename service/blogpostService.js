const { BlogPost, Categorie, PostsCategorie, User } = require('../models');
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

    categoryIds.forEach(async (catId) => { 
      await PostsCategorie.create({
        postId: blogPost.dataValues.id, categoryId: catId }, { fields: ['postId', 'categoryId'] }); 
    });

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

  try {
    const blogPostList = await BlogPost.findAll({ 
      // where: {},
      attributes: [ 'id', 'title', 'content', 'userId', 'published', 'updated' ],
      // exclude: [ 'BlogPostId' ],
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categorie, as: 'categories' }
        
      ],
    }




    //   {
    //   attributes: [ 'id', 'title', 'content', 'userId', 'published', 'updated' ] 
    //   // include: { model: BlogPost, as: 'post', through: { attributes: [] } },
    // }

    //   { include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    // { model: Categorie, as: 'categories', through: { attributes: [] } }] },
    // );

    ) 

    console.log('--------------------------------- ', blogPostList)

    const reply = blogpostController.showAllBlogPostOk(blogPostList);
    res.status(reply.code).send(reply.blogpost);

  } catch (error) {
    console.log('**************************************   ', error)
    
  }
  
}

module.exports = {
  createBlogpost,
  showAllBlogPost,
};
