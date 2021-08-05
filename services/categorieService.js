const status = require('../status/status');

const verifyName = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(status.BAD_REQUEST).json({ message: '"name" is required' });
  }
  next();
};

module.exports = {
  verifyName,
};