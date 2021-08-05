require('dotenv').config();

const categoriesServices = require('../services/categoryServices');
const { code } = require('../helpers/messages');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await categoriesServices.createCategory(name);
    return res.status(code.CREATED).json(category);
  } catch (error) {
    if (error.message === '"name" is required') {
      return res.status(code.BAD_REQUEST).json({ message: error.message });
    }
    return res.status(error.code).json({ message: error.message });
  }
};

const getAllCategories = async (_req, res) => {
  try {
    const allCategories = await categoriesServices.getAllCategories();
    return res.status(code.OK).json(allCategories);
  } catch (err) {
    res.status(code.SERVER_ERROR).json({ message: err.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};