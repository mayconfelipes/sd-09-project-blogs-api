const { Categories } = require('../models');

const validatePostCategorie = (req, res, next) => {
  const { categoryIds } = req.body;
  categoryIds.forEach((categoryId) => {
    Categories.findOne({ where: { id: categoryId } })
      .then((result) => {
        console.log(result);
        if (!result) {
          const error = {
            code: 400,
            message: '"categoryIds" not found',
          };
          next(error);
        }
      });
  });
  next();
};

module.exports = validatePostCategorie;
