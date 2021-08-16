const blockCategoriesFromBeingEdited = async (req, res, next) => {
    const { categoryIds } = req.body;
    
    if (categoryIds) {
      return res.status(400).send({ message: 'Categories cannot be edited' });
    }
    
    return next();
  };
  
  module.exports = blockCategoriesFromBeingEdited;