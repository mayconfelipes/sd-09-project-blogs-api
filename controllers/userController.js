const jwt = require('jsonwebtoken');
const { User } = require('../models');
const status = require('../status/status');

const secret = 'parangaricotirimirruaro';

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    await User.create({ displayName, email, password, image });

    const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ email }, secret, jwtConfig);
    console.log(token);

    res.status(status.CREATED).json({ token });
  } catch (err) {
    console.log(err);
    res.status(status.ERRO).json({ message: 'Erro no controller' });
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(status.OK).json(users);
  } catch (err) {
    console.log(err);
    return res.status(status.ERRO).json({ message: 'Users not found' });
  }
};

const findUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(status.NOT_FOUND).json({ message: 'User does not exist' });
    }
    return res.status(status.OK).json(user);
  } catch (err) {
    console.log(err);
    return res.status(status.ERRO).json({ message: 'Deu ruim no user' });
  }
};

module.exports = {
  createUser,
  findAllUsers,
  findUser,
};