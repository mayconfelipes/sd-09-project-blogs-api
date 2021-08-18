const CategoryService = require('../services/categoryService');
const { messages, codes } = require('../util/responseHandling');

const createCategory = async (req, res) => {
  console.log('aqui');
  try {
    const { name } = req.body;
    const { response, code } = await CategoryService.createCategory(name);
    res.status(code).json(response);
  } catch (error) {
    res.status(codes.CODE_500).json({ message: messages.UNEXPECTED_ERROR, error });
  }
};

const getAllCategories = async (_req, res) => {
  try {
    const { response, code } = await CategoryService.getAllCategories();
    res.status(code).json(response);
  } catch (error) {
    res.status(codes.CODE_500).json({ message: messages.UNEXPECTED_ERROR, error });
  }
};

module.exports = { createCategory, getAllCategories };