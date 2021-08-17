const { User } = require('../models');
const { validateDisplayName, validateEmail, validatePassword } = require('../middlewares');

const userAdd = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    validateDisplayName(displayName, res);
    validateEmail(email, res);
    validatePassword(password, res);
    const newUser = await User.create({ displayName, email, password, image });
    return res.status(201).json(newUser);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Erro 123' });
  }
};

module.exports = { userAdd };