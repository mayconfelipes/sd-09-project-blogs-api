const categoryServices = require('../services/categoryServices');
const { created } = require('../helpers/getHttpStatusCode');
// const filterUserData = require('../helpers/filterUserData');

const createCategory = async (req, res, next) => {
  try {
    const newCategory = await categoryServices.createUser(req.body);
    return res.status(created).json(newCategory);
  } catch (err) {
    return next(err);
  }
};

module.exports = { createCategory };
