const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

const secret = 'something';

const jwtConfig = {
  algorithm: 'HS256',
};

router.post('/user', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    await User.create({ displayName, email, password, image });

    const token = jwt.sign({ email }, secret, jwtConfig);
    return res.status(201).json({ token });
  } catch (err) {
    if (err.errors[0].message === 'Users.email must be unique') {
      return res.status(409).json({ message: 'User already registered' });
    }
    return res.status(400).json({ message: err.errors[0].message });
  }
});

router.get('/user', validateJWT, async (_req, res) => {
  const users = await User.findAll();

  return res.status(200).json(users);
});

const validateLogin = (email, password) => {
  if (email === undefined) return { message: '"email" is required' };
  if (password === undefined) return { message: '"password" is required' };
  if (email === '') return { message: '"email" is not allowed to be empty' };
  if (password === '') return { message: '"password" is not allowed to be empty' };
};

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(validateLogin(email, password));
  }

  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(400).json({ message: 'Invalid fields' });

  const token = jwt.sign({ email }, secret, jwtConfig);
  return res.status(200).json({ token });
});

router.get('/user/:id', validateJWT, async (req, res) => {
  const { id } = req.params;
  const findUser = await User.findByPk(id);

  if (!findUser) return res.status(404).json({ message: 'User does not exist' });

  return res.status(200).json(findUser);
});

router.delete('/user/me', validateJWT, async (req, res) => {
  try {
    const userId = req.user;

    await User.destroy({ where: { id: userId } });
    
    res.status(204).end();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
