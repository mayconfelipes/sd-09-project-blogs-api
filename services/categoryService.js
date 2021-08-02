const { Category } = require('../models');

const insertCategory = async (categoriName) => {
    const { dataValues } = await Category.create({ name: categoriName });
    
    return dataValues;
};

const findAllCategories = async () => {
    const allCategories = await Category.findAll();
    
    return allCategories; 
};

module.exports = {
    insertCategory,
    findAllCategories,
};
