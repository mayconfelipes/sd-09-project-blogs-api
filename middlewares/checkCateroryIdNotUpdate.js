const checkCategoryIdNotUpdate = async (req, res, next) => {
  const { categoryIds } = req.body;
  
  if (categoryIds) {
    return res.status(400).send({ message: 'Categories cannot be edited' });
  }
  
  return next();
};

module.exports = checkCategoryIdNotUpdate;
