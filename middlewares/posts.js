// const Joi = require('joi');
const { BADREQUEST } = require('../ultils');
const { Categorie } = require('../models');

const validatePost = [
    async (req, res, next) => {
        const { title, content, categoryIds } = req.body;

        if (!title) { 
            return res.status(BADREQUEST)
            .json({ message: '"title" is required' }); 
          }
        
          if (!content) { 
            return res.status(BADREQUEST)
            .json({ message: '"content" is required' }); 
          }
        
          if (!categoryIds) { 
            return res.status(BADREQUEST)
            .json({ message: '"categoryIds" is required' }); 
          }
          next();
    },
    async (req, res, next) => {
        const { categoryIds } = req.body;

        const categories = await Categorie.findAll();
        const ids = categories.map((response) => response.id);
        
        for (let i = 0; i < categoryIds.length; i += 1) {
            if (!ids.includes(categoryIds[i])) {
              return res.status(BADREQUEST)
              .json({ message: '"categoryIds" not found' });
            }
          }
          next();
    },
];

const categoriesValidate = [
  async (req, res, next) => {
  // const schema = Joi.object({
  //   title: Joi.string().required(),
  //   content: Joi.string().required(),
  // });
  // const { error } = schema.validate(req.body);

  // if (error) {
  //   return res.status(400).json(error.message);
  // }
  // next();
  const { title, content } = req.body;

  if (!title) {
      return res.status(400).json({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  next();
},

  async (req, res, next) => {
    if (Object.keys(req.body).includes('categoryIds')) {
      return res.status(400).json({ message: 'Categories cannot be edited' });
    }
    next();
  },
];

module.exports = {
    validatePost,
    categoriesValidate,
};