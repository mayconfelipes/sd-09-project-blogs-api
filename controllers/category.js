const { serviceRegisterCategory, serviceGetAll } = require('../services/category');

const createCategory = async (req, res, next) => {
  const category = req.body;
  try {
    const serviceResponse = await serviceRegisterCategory(category);
    if (serviceResponse.status) {
      return next({
        status: serviceResponse.status,
        message: serviceResponse.message,
      });
    }
    return res.status(201).json(serviceResponse);
  } catch (err) {
    return next(err);
  }
};

const getAllCategory = async (_req, res, next) => {
  try {
    const serviceResponse = await serviceGetAll();
    return res.status(200).json(serviceResponse);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createCategory,
  getAllCategory,
};