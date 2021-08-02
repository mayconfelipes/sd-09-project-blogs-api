const { Categorie } = require('../models');

const insertCategorie = async (categoriName) => {
    const { dataValues } = await Categorie.create({ name: categoriName });
    
    return dataValues;
};

module.exports = { insertCategorie };
