const { validateLoginFormat } = require('../services/LoginServices');
const { User } = require('../models');

const ValidateLogin = async (req, res, next) => {
  const { body } = req;
  const { email, password } = body;

  const validate = await validateLoginFormat(body);
  if (validate !== true) return res.status(400).json({ message: validate });

  // const all = await User.findAll();
  // console.log(all);
  const search = await User.findOne({ where: { email, password } });
  if (search === null) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  
  next();
};

module.exports = ValidateLogin;
