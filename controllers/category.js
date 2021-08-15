const { Category } = require('../models/index');

const postCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).send({ message: '"name" is required' });
    const category = await Category.create({ name });
    return res.status(201).send(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
  };

  const getCategories = async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.status(200).send(categories);
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  };

module.exports = {
  postCategory,
  getCategories,
};
