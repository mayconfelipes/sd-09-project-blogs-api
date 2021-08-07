const { Users } = require('../models');
const { validEmail, validPassword, validDisplayName } = require('../services');

const validUser = async (req, res, next) => {
  const user = req.body;
  const nameOk = validDisplayName(user.displayName);
  const emailOk = validEmail(user.email);
  const passwordOk = validPassword(user.password);

  if (nameOk !== true) {
    return res.status(400).json({ message: nameOk });
  }
  if (emailOk !== true) {
    return res.status(400).json({ message: emailOk });
  }
  if (passwordOk !== true) {
    return res.status(400).json({ message: passwordOk });
  }

  const userAlredyExist = await Users.findOne({ where: { email: user.email } });
  if (userAlredyExist) return res.status(409).json({ message: 'User already registered' });

  next();
};

module.exports = { validUser };
