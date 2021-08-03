const status = require('../statusCode/status');
const categoriServices = require('../services/categoriServices');

const createCategories = async (req, res) => {
  const bodyReq = req.body;
  const result = await categoriServices.createCategories(bodyReq);
  if (result.message) {
    res.status(status.BAD_REQUEST).json(result);
  }
  return res.status(status.CREATE).json(result);
};

const getAll = async (req, res) => {
  const result = await categoriServices.getAll();
  return res.status(status.OK).json(result);
};

module.exports = {
  createCategories,
  getAll,
};