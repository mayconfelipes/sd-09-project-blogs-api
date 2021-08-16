// Rotas
const create = async (req, res, next) => {
  try {
    res.status(201).json({ message: 'criar usuario' });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'login' });
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'listar usuarios' });
  } catch (error) {
    next(error);
  }
};

const listById = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'listar usuario por id' });
  } catch (error) {
    next(error);
  }
};

const exclude = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'excluir usuario' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  login,
  list,
  listById,
  exclude,
};
