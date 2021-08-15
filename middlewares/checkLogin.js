const { User } = require('../models/index');

const checkLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const LoginIsValid = await User.findOne({ where: { email, password } });

    if (!LoginIsValid) {
      return res.status(400).send({ message: 'Invalid fields' });
    }
    return next();
};

module.exports = checkLogin;
