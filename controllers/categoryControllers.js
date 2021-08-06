require('dotenv').config();

const categoriesServices = require('../services/categoryServices');
const { code } = require('../helpers/messages');

const createCategory = async (req, res) => {
  // console.log(req.body);
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
  } catch (error) {
    res.status(code.SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
}; 