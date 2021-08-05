const { Category } = require('../models');
const status = require('../status/status');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const categories = await Category.create({ name });
    res.status(status.CREATED).json(categories);
  } catch (err) {
    console.log(err);
    res.status(status.ERRO).json({ message: 'Deu ruim no categories' });
  }
};

const findAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(status.OK).json(categories);
  } catch (err) {
    console.log(err);
    res.status(status.ERRO).json({ message: 'Deu ruim nas categories' });
  }
};

module.exports = {
  create,
  findAllCategories,
};