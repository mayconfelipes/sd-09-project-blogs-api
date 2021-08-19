const validateName = async (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: '"name" is required' });
  }
  next();
};

module.exports = {
  validateName,
};