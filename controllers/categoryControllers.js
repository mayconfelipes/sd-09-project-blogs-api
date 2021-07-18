const Category = require('../services/categoryService');

const addCategory = async (req, res) => {
  const category = req.body;
  try {
    const createdCategory = await Category.addCategory(category);
    if (createdCategory.error) {
      return res.status(createdCategory.error.code)
      .json({ message: createdCategory.error.message });
    }
    return res.status(201).json(createdCategory);
  } catch (error) {
    res.status(500).json({ message: 'Internal Error', error });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Internal Error', error });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
};