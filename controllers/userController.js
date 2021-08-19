const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: 60555555,
};

const userAdd = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    await User.create({ displayName, email, password, image });

    const token = jwt.sign({ data: displayName }, secret, jwtConfig);

    return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Erro 123' });
  }
};

const getAll = async (req, res) => {
  await User.findAll().then((data) => {
    const userAtt = [];
    data.forEach((user) => {
      const { displayName, email, id, image } = user;
      const userInfo = { displayName, email, id, image };
      userAtt.push(userInfo);
    });
    return res.status(200).send(userAtt);
  }).catch((e) => res.status(500).json({ message: e.message }));
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res
        .status(404).json({ message: 'User does not exist' });
    }
    const numberId = Number(id);
    const { displayName, email, image } = user;
    const userInfo = { id: numberId, displayName, email, image };
    return res.status(200).send(userInfo);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

module.exports = { userAdd, getAll, getUser };
