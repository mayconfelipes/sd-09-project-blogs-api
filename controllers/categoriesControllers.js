const categoriesServices = require('../services/categoriesServices');

const created = 201;

const createNewCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await categoriesServices.createNewCategory({ name });
    return res.status(created).json(newCategory);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createNewCategory,
};
