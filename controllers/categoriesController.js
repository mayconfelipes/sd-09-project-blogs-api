const { Categories } = require('../models');
require('dotenv').config();

const add = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  try {
    const addCat = await Categories.create({ name });
    return res.status(201).json(addCat);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Erro 123' });
  }
};

const getAll = async (req, res) => {
  await Categories.findAll().then((data) => {
    const catAtt = [];
    data.forEach((category) => {
      const { id, name } = category;
      const catInfo = { id, name };
      catAtt.push(catInfo);
    });
    return res.status(200).send(catAtt);
  }).catch((e) => res.status(500).json({ message: e.message }));
};

module.exports = {
  add,
  getAll,
};