const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validateDisplayName, validateEmail, validatePassword } = require('../middlewares');

const secret = 'secret';
const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: 60 * 5,
};

const userAdd = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    if (validateDisplayName(displayName, res)) return;
    if (validateEmail(email, res)) return;
    if (validatePassword(password, res)) return;
    await User.create({ displayName, email, password, image });

    const token = jwt.sign({ data: displayName }, secret, jwtConfig);

    return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Erro 123' });
  }
};

module.exports = { userAdd };