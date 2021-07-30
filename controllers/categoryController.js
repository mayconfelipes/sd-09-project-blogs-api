const rescue = require('express-rescue');
const validateToken = require('../middlewares/validateToken');
const categoryService = require('../services/categoryService');

const httpStatus = require('../middlewares/httpStatus');

const createCategory = [
  validateToken,
  rescue(async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: '"name" is required' });
    }
    const category = await categoryService.createCategory(name);
    return res.status(httpStatus.CREATED).json(category);
  }),
];

module.exports = {
  createCategory,
};