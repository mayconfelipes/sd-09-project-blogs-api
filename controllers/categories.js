const models = require('../models');

const createCategorie = async (req, res) => {
    const { name } = req.body;
  
      if (!name) { 
        return res.status(400).json({ message: '"name" is required' }); 
      }
  
    try {
      const newCategorie = await models.Categories.create(name);
     // console.log(newCategorie);
      return res.status(201).json({ ...newCategorie.dataValues, name });
    } catch (e) {
      // console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    }
  };

  const getAll = async (req, res) => {
    const getCategories = await models.Categories.findAll();
    return res.status(200).json(getCategories);
  };

  module.exports = {
    createCategorie,
    getAll,
  };