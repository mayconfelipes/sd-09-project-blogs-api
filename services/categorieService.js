const { Categorie } = require('../models');

const insertCategorie = async (categoriName) => {
    const { dataValues: { name } } = await Categorie.create({ name: categoriName });
    
    return name;
};

module.exports = { insertCategorie };
