const { BlogPost, Categorie, PostsCategorie, User } = require('../models');
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

    
      const blogPost = await BlogPost.create({ title, content, userId })
      
      const categorie = await Categorie.findAll({ where: { id: categoryIds  } })
// 
      // console.log(JSON.stringify(blogPost, null, 2))
      // console.log(blogPost.dataValues.id) 

      // await newBlogpost.addPostCategorie(JSON.stringify(categorie, null, 2))

      await blogPost.addCategorie()





      const reply = blogpostController.createBlogpostOk(blogPost);
      return res.status(reply.code).json(reply.blogpost);
    

  } catch (error) {
      // const reply = blogpostController.createBlogpostError(error.parent.sqlMessage)
      // res.status(reply.code).send({ message: reply.phrase })
      console.log('------------------------ ', error )
  }



}

module.exports = {
  createBlogpost,
};
