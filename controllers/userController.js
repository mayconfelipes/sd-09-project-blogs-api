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
    validateDisplayName(displayName, res);
    validateEmail(email, res);
    validatePassword(password, res);
    await User.create({ displayName, email, password, image });

    const token = jwt.sign({ data: displayName }, secret, jwtConfig);

    return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Erro 123' });
  }
};

module.exports = { userAdd };