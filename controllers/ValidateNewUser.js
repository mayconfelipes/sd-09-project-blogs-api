const { User } = require('../models');
const { validateUserFormat } = require('../services/userServices'); 

const ValidateNewUser = async (req, res, next) => {
  const { email } = req.body;

  const validate = await validateUserFormat(req.body);
  if (validate !== true) return res.status(400).json({ message: validate });

  try {
    const find = await User.findOne({ where: { email } });

    if (find) return res.status(409).json({ message: 'User already registered' });
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = ValidateNewUser;
