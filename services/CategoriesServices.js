const { Categories } = require('../models');
const validationCategorie = require('../middlewares/validationCategorie');

const getAll = async () => {
    const categories = await Categories.findAll();
    return categories;
};

const addCategorie = async (body) => {
    const validate = validationCategorie(body);
    if (validate.error === undefined) {
        const categorie = await Categories.create(body);
        return categorie;
    }
    return { message: validate.error };
};

module.exports = { getAll, addCategorie };