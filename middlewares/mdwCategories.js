const categorieService = require('../services/categorieService');
const status = require('../services/statusCode');

const categoryObjectValidator = async (req, res, next) => {
  try {
    const { name } = req.body;
    const data = await categorieService.categorieObjectValidator(name);
    if (data.message) throw data;
    return res.status(status.created).json(data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  categoryObjectValidator,
};
