const { Users } = require('../models');
const { validEmail, validPassword } = require('../services');

const createToken = async (req, res, next) => {
  const { email, password } = req.body;
  const emailOk = validEmail(email);
  const passwordOk = validPassword(password);

  if (emailOk !== true) {
    return res.status(400).json({ message: emailOk });
  }
  if (passwordOk !== true) {
    return res.status(400).json({ message: passwordOk });
  }

  const userAlredyExist = await Users.findOne({ where: { email, password } });
  if (!userAlredyExist) return res.status(400).json({ message: 'Invalid fields' });

  next();
};

module.exports = { createToken };
