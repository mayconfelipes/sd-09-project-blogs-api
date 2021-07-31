const categoryServices = require('../services/categories');

const { CREATED_STATUS } = require('../middwares/httpStatus');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await categoryServices.create(name);

    return res.status(CREATED_STATUS).json(newCategory);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
};