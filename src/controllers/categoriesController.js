const categoriesServices = require('../services/categoriesServices');

const create = async (req, res) => {
  const { name } = req.body;
  console.log('categorias');
  const { id } = await categoriesServices.create({ name });
  return res
    .status(201)
    .json({ 
      id, 
      name, 
    });
};

const getAll = async (_req, res) => {
  const response = await categoriesServices.getAll();
  return res
    .status(200)
    .json(response);
};

module.exports = {
  create,
  getAll,
};