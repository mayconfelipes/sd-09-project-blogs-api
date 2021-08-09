const categoriesValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  next();
};

module.exports = { categoriesValidation };
/* este projeto tem participação  da trinca de 9: Joao Vitor Joao Pedro */