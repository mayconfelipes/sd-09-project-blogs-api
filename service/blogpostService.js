/* eslint-disable max-lines-per-function */
const { BlogPost, Categorie, PostsCategorie} = require('../models');
const blogpostController = require('../controller/blogpostController');

const createBlogpost = async (req, res, _next) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;

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

    const categorieList = await Categorie.findAll({ where: { id: categoryIds } })
    if (!categorieList.length) { throw categorieList; } 

    const blogPost = await BlogPost.create({ title, content, userId })

    // categoryId.forEach(category => {
    //   await PostsCategorie.create({ postId: blogPost.dataValues.id , categoryId: category }, { fields: ['postId', 'categoryId']  })
    // });


    // const test = await PostsCategorie.findAll({ attributes: ['postId', 'categoryId'] } )





    // const postsCategorie = await PostsCategorie.create({ postId: 1 , categoryId: 2 }, { fields: ['postId', 'categoryId']  })


    // console.log('---postCategorie-------------', postsCategorie, '-------------------------------')
    // console.log('++++++++++++++++teste+++++++++++++++++', JSON.stringify(test, null, 2), '+++++++++++++++++++++++++')

    // if (test) {
    //   throw 'isso foi um erro'
    // }

    console.log('    ======   ', categorieList, '   ====    ')

    // const blogPost = 'await BlogPost.findAll({ where: { id: 2 }})'
    // console.log( (await blogPost.getPost()))
    // const list = JSON.stringify(usersList, null, 2);


    const reply = blogpostController.createBlogpostOk(blogPost);
    return res.status(reply.code).json(reply.blogpost);
    

  } catch (error) {

    if (error.length === 0) {
      const reply = blogpostController.createBlogpostError(error)
      return res.status(reply.code).send({ message: reply.phrase })
    }
    const reply = blogpostController.createBlogpostError(error.message)
    res.status(reply.code).send({ message: reply.phrase })
    // console.log('------------------------ ', error.length )
  }
}

module.exports = {
  createBlogpost,
};
