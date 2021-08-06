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
        // console.log(ids); // verifica os ids
        
        for (let i = 0; i < categoryIds.length; i += 1) {
            if (!ids.includes(categoryIds[i])) {
              return res.status(BADREQUEST)
              .json({ message: '"categoryIds" not found' });
            }
          }
          next();
    },
];

module.exports = {
    validatePost,
};