// Rotas
const createPost = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'criar post' });
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'listar posts' });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'listar post por id' });
  } catch (error) {
    next(error);
  }
};

const editPost = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'editar post' });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'excluir post' });
  } catch (error) {
    next(error);
  }
};

const searchPost = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'procurar post por termo' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getPost,
  getPostById,
  editPost,
  deletePost,
  searchPost,
};
