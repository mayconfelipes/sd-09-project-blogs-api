const rescue = require('express-rescue');
const joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const { sequelize } = require('../models');
const { BlogPost, User, Category } = require('../models');

const setNew = rescue(async (req, res, next) => {
  const { error } = joi.object({
      title: joi.string().required(),
      content: joi.string().required(),
      categoryIds: joi.array().required(),
  }).validate(req.body);

  if (error) return next(error);

  const { id } = await User.findOne({ where: req.email });
  const { title, content, categoryIds } = req.body;
  const categories = await Category.findAll();
  const categoriesArr = categories.map((categorie) => categorie.id);

  for (let i = 0; i < categoryIds.length; i += 1) {
    if (!categoriesArr.includes(categoryIds[i])) {
      return res.status(400).json({ message: '"categoryIds" not found' }); 
    }
  }

  const blogPost = await sequelize.transaction(async (transaction) => (
    BlogPost.create({ title, content, userId: id }, { transaction })));

  res.status(StatusCodes.CREATED).json(blogPost);
});

const getAll = rescue(async (_req, res) => {
  // get help with one of my 'trinca's' partner to fix associations
    const blogPosts = await BlogPost.findAll({ 
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    if (!blogPosts) res.status(StatusCodes.NOT_FOUND).json({ message: '"BlogPosts" not found' });
    
    res.status(StatusCodes.OK).json(blogPosts);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;

    const blogPost = await BlogPost.findOne({
      where: { id }, 
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    if (!blogPost) res.status(StatusCodes.NOT_FOUND).json({ message: 'Post does not exist' });
    
    res.status(StatusCodes.OK).json(blogPost);
});

const updateById = rescue(async (req, res, next) => {
  if (req.body.categoryIds) {
 res.status(StatusCodes.BAD_REQUEST).json({ message: 'Categories cannot be edited' }); 
}
  
  const { error } = joi.object({ title: joi.string().required(),
      content: joi.string().required(),
  }).validate(req.body);

  if (error) return next(error);

  const { title, content } = req.body;
  const { categories, userId } = await BlogPost.findOne({ where: req.params.id, 
    include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
  });

  const user = await User.findOne({ where: req.email });

  if (user.id !== userId) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized user' }); 
}
      
  await sequelize.transaction(async (transaction) => (
    BlogPost.update({ title, content }, { where: req.params.id }, { transaction })));
  
  res.status(StatusCodes.OK).json({ title, content, categories, userId });
});

const deleteById = rescue(async (req, res) => {
  const { id } = req.params;
  const blogPost = await BlogPost.findOne({ where: { id } });

  if (!blogPost) {
    res.status(StatusCodes.NOT_FOUND).json({ 
      message: 'Post does not exist', 
    }); 
}

  const { userId } = blogPost;
  const { email } = req;
  const user = await User.findOne({ where: { email } });

  if (user.id !== userId) {
 res.status(StatusCodes.UNAUTHORIZED).json({ 
    message: 'Unauthorized user' }); 
}
  
  await sequelize.transaction(async (transaction) => (
    BlogPost.destroy({ where: { id } }, { transaction })));

  res.sendStatus(StatusCodes.NO_CONTENT);
});

module.exports = { 
  setNew,
  getAll,
  getById,
  updateById,
  deleteById,
};
