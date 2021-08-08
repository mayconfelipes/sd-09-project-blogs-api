const { validName } = require('../services');

const nameCategory = async (req, res, next) => {
  const { name } = req.body;
  const nameOk = validName(name);

  if (nameOk !== true) {
    return res.status(400).json({ message: '"name" is required' });
  }

  next();
};

module.exports = { nameCategory };
