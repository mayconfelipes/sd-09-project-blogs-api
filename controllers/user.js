const jwt = require('jsonwebtoken');
const models = require('../models');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
}; 

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const emailExist = await models.Users.findOne({ where: { email } });  
  if (emailExist) return res.status(409).json({ message: 'User already registered' });

  try {
    await models.Users.create({ displayName, email, password, image });

    const token = jwt.sign({ data: [displayName, email, password, image] }, secret, jwtConfig);

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAll = async (req, res) => {
  const users = await models.Users.findAll();
  return res.status(200).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await models.Users.findOne({ where: { id } });
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser, 
  getAll,
  getById,
};