const categoryServices = require('../services/categoryServices');

const postCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await categoryServices.postCategory(name);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (req, res) => {
  const result = await categoryServices.getAllCategories();

  res.status(200).json(result);
};

module.exports = {
  postCategory,
  getAllCategories,
};
