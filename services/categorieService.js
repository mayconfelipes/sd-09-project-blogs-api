const { Categorie } = require('../models');

const insertCategorie = async (categoriName) => {
    const { dataValues } = await Categorie.create({ name: categoriName });
    
    return dataValues;
};

const findAllCategories = async () => {
    const allCategories = await Categorie.findAll();
    
    return allCategories; 
};

module.exports = {
    insertCategorie,
    findAllCategories,
};
