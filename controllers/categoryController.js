const { createCategory, getAllCat } = require('../services/category');

const CODE_201 = 201;
const CODE_200 = 200;
const CODE_401 = 401;
const CODE_400 = 400;
// const CODE_404 = 404;
// const CODE_409 = 409;

const createCat = async (req, res) => {
  try {
    const { name } = req.body;
    const newCat = await createCategory(name);
    res.status(CODE_201).json(newCat);
  } catch (err) {
    return res.status(CODE_400).json({
      message: err.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const allCat = await getAllCat();
    return res.status(CODE_200).json(allCat);
  } catch (err) {
    return res.status(CODE_401).json({
      message: err.message,
    });
  }
};

module.exports = {
  createCat,
  getAllCategories,
};
