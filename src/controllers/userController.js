const jwt = require('jsonwebtoken');
const userServices = require('../services/userServices');

const secret = process.env.JWT_SECRET;

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const { id } = await userServices.create({ displayName, email, password, image });
  const token = jwt.sign({ data: { id, email } }, secret, jwtConfig);
  return res
    .status(201)
    .json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const { _id } = await userServices.login({ email, password });
  const token = jwt.sign({ data: { id: _id, email } }, secret, jwtConfig);
  return res
    .status(200)
    .json({ token });
};

module.exports = {
  create,
  login,
};