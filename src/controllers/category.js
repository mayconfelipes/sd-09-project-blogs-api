// Rotas
const createCategory = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'criar categoria' });
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'listar categorias' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getCategory,
};
