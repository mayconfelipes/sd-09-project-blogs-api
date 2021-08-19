const { Categories } = require('../models');
require('dotenv').config();

const add = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(201).json({ message: '"name" is required' });
  }
  try {
    const addCat = await Categories.create({ name });
    return res.status(201).json(addCat);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Erro 123' });
  }
};

module.exports = {
  add,
};