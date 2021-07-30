const jwt = require('jsonwebtoken');
const userService = require('../services/userServices');

const secret = process.env.JWT_SECRET;

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const { id } = await userService.create({ displayName, email, password, image });
  const token = jwt.sign({ data: { id, email } }, secret, jwtConfig);
  return res
    .status(201)
    .json({ token });
};

module.exports = {
  create,
};