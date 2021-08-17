const CategoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  console.log('aqui');
  try {
    const { name } = req.body;
    const { response, code } = await CategoryService.createCategory(name);
    res.status(code).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = { createCategory };