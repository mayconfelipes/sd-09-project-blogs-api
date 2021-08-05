const jwt = require('jsonwebtoken');
const { User } = require('../models');
const status = require('../status/status');

const secret = 'parangaricotirimirruaro';

const login = async (req, res) => {
  try {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(status.BAD_REQUEST).json({ message: 'Invalid fields' });
  }

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ email }, secret, jwtConfig);

  res.status(status.OK).json({ token });
  } catch (err) {
    console.log(err);
    res.status(status.ERRO).json({ message: 'Deu ruim no login' });
  }
};

module.exports = {
  login,
};