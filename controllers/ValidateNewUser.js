const { User } = require('../models');
const { validateUserFormat } = require('../services/userServices'); 

const ValidateNewUser = async (req, res, next) => {
  const { email } = req.body;

  const validate = await validateUserFormat(req.body);
  if (validate !== true) return res.status(400).json({ message: validate });

  const findEmail = await User.findOne({ where: { email } });
  if (findEmail !== null) {
    return res.status(409).json({ message: 'User already registered' });
  }
  next();
};

module.exports = ValidateNewUser;
