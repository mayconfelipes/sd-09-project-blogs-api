const rescue = require('express-rescue');
const validate = require('../middlewares/validate');
const catServices = require('../services/categories');
const response = require('../middlewares/responseCodes');
// const { Categories } = require('../../models');

const createNew = [
  validate.authToken,
  validate.categoryCreation,
  rescue(async (req, res) => {
    // const { name } = req.body;
    const newCat = await catServices.createNew(req.body);
    return res.status(response.STATUS_CREATED).json(newCat);
  }),
];

module.exports = {
  createNew,
};