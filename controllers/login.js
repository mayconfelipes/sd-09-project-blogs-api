const jwt = require('jsonwebtoken');
const { validatePassword, validateEmail } = require('../middlewares');
const { User } = require('../models');

const secret = 'secret';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: 60 * 5,
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  
  try {
    if (await validatePassword(password, res)) return;
    if (await validateEmail(email, res)) return;
    
    const exists = await User.findOne({ where: { email } });
    if (!exists) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
      const token = jwt.sign({ data: exists.displayName }, secret, jwtConfig);
      return res.status(200).json({ message: 'Login successful', token });
  } catch (e) {
    console.log('Erro de Login');
    
    return res.status(500).json({ message: 'Internal Error', error: e.message });
  }
};

module.exports = login;