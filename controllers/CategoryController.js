const CategoryService = require('../services/CategoryService');

const STATUS_401 = 401;
const STATUS_400 = 400;
const STATUS_201 = 201;
const STATUS_200 = 200;

const addCategory = async (req, res) => {
try {
    const { name } = req.body;
    const category = await CategoryService.addCategory(name);
    return res
    .status(STATUS_201)
    .json(category);
  } catch (err) {
    return res
    .status(STATUS_400)
    .json({ message: err.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const result = await CategoryService.getAllCategories();
    return res
    .status(STATUS_200)
    .json(result);
  } catch (err) {
    return res
    .status(STATUS_401)
    .json({ message: err.message });
  }
};

module.exports = { 
  addCategory,
  getAllCategories,
};