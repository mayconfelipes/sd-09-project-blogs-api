const { validateLoginFormat } = require('../services/LoginServices');
const { User } = require('../models');

const ValidateLogin = async (req, res, next) => {
  const { body } = req;
  const { email, password } = body;

  const validate = await validateLoginFormat(body);
  if (validate !== true) return res.status(400).json({ message: validate });

  try {
    const find = await User.findOne({ where: { email, password } });
    if (!find) return res.status(400).json({ message: 'Invalid fields' });
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = ValidateLogin;
